// Story Image Validation Checker
// Paste this into your browser console to inspect your stories

console.log('🔍 Story Image Validation Checker\n');

// Get all stories from localStorage
const storiesJson = localStorage.getItem('kid-story-stories');
if (!storiesJson) {
  console.log('❌ No stories found in localStorage');
} else {
  const stories = JSON.parse(storiesJson);
  console.log(`📚 Found ${stories.length} stories\n`);
  
  stories.forEach((story, index) => {
    console.log(`\n📖 Story ${index + 1}: "${story.title}"`);
    console.log(`   ID: ${story.id}`);
    console.log(`   Created: ${new Date(story.createdAt).toLocaleString()}`);
    
    // Check cover image
    console.log(`\n   Cover Image:`);
    if (!story.coverImage) {
      console.log(`   ❌ Missing`);
    } else if (typeof story.coverImage !== 'string') {
      console.log(`   ❌ Invalid type: ${typeof story.coverImage}`);
    } else if (story.coverImage.trim() === '' || story.coverImage === '[object Object]') {
      console.log(`   ❌ Invalid value: "${story.coverImage}"`);
    } else {
      try {
        const url = new URL(story.coverImage);
        console.log(`   ✅ Valid URL: ${story.coverImage.substring(0, 60)}...`);
      } catch (e) {
        console.log(`   ❌ Invalid URL: "${story.coverImage}"`);
      }
    }
    
    // Check scene images
    console.log(`\n   Scene Images:`);
    story.scenes.forEach((scene, sceneIndex) => {
      if (!scene.imageUrl) {
        console.log(`   Scene ${sceneIndex + 1}: ❌ Missing`);
      } else if (typeof scene.imageUrl !== 'string') {
        console.log(`   Scene ${sceneIndex + 1}: ❌ Invalid type: ${typeof scene.imageUrl}`);
      } else if (scene.imageUrl.trim() === '' || scene.imageUrl === '[object Object]') {
        console.log(`   Scene ${sceneIndex + 1}: ❌ Invalid value: "${scene.imageUrl}"`);
      } else {
        try {
          const url = new URL(scene.imageUrl);
          console.log(`   Scene ${sceneIndex + 1}: ✅ Valid URL: ${scene.imageUrl.substring(0, 50)}...`);
        } catch (e) {
          console.log(`   Scene ${sceneIndex + 1}: ❌ Invalid URL: "${scene.imageUrl}"`);
        }
      }
    });
    
    console.log('\n   ' + '─'.repeat(80));
  });
  
  // Summary
  console.log('\n\n📊 Summary:\n');
  const invalidStories = stories.filter(story => {
    if (!story.coverImage || typeof story.coverImage !== 'string' || story.coverImage.trim() === '' || story.coverImage === '[object Object]') {
      return true;
    }
    try {
      new URL(story.coverImage);
    } catch {
      return true;
    }
    
    return story.scenes.some(scene => {
      if (!scene.imageUrl || typeof scene.imageUrl !== 'string' || scene.imageUrl.trim() === '' || scene.imageUrl === '[object Object]') {
        return true;
      }
      try {
        new URL(scene.imageUrl);
        return false;
      } catch {
        return true;
      }
    });
  });
  
  if (invalidStories.length === 0) {
    console.log('✅ All stories have valid image URLs!');
  } else {
    console.log(`⚠️  ${invalidStories.length} of ${stories.length} stories have invalid image URLs:`);
    invalidStories.forEach(story => {
      console.log(`   - "${story.title}" (ID: ${story.id})`);
    });
    console.log('\n💡 These stories will show emoji placeholders instead of images.');
    console.log('💡 Delete them and create new stories to get real Replicate images.');
  }
}

console.log('\n\n🛠️  Quick Actions:\n');
console.log('To delete all stories and start fresh:');
console.log('   localStorage.removeItem("kid-story-stories"); location.reload();');
console.log('\nTo delete a specific story by ID:');
console.log('   // Replace STORY_ID with the actual ID');
console.log('   const stories = JSON.parse(localStorage.getItem("kid-story-stories"));');
console.log('   const filtered = stories.filter(s => s.id !== "STORY_ID");');
console.log('   localStorage.setItem("kid-story-stories", JSON.stringify(filtered));');
console.log('   location.reload();');
