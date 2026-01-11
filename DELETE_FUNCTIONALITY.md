# Delete Story Functionality

## Overview
The delete story feature now **permanently removes** both the story data from MongoDB and all associated images from Cloudinary.

## Implementation Details

### Backend Changes

#### 1. Cloudinary Service (`lib/cloudinary.ts`)
Added new functions to handle image deletion:

- **`extractPublicId(cloudinaryUrl: string)`**: Extracts the public_id from a Cloudinary URL
- **`deleteFromCloudinary(cloudinaryUrl: string)`**: Deletes a single image from Cloudinary
- **`deleteMultipleFromCloudinary(cloudinaryUrls: string[])`**: Deletes multiple images in parallel

#### 2. DELETE API Endpoint (`app/api/stories/[id]/route.ts`)
Updated to perform a complete cleanup:

1. **Fetch the story** - First retrieves the story to access all image URLs
2. **Collect image URLs** - Gathers all Cloudinary URLs from:
   - Cover image (if exists)
   - All scene images
3. **Delete from Cloudinary** - Removes all images from Cloudinary storage
4. **Delete from database** - Removes the story document from MongoDB
5. **Authorization** - Only allows users to delete their own stories

### Frontend

#### Story Card Component (`components/StoryCard.tsx`)
- Shows a trash icon button for stories in "My Stories" view
- Opens a confirmation modal before deleting

#### Delete Confirmation Modal (`components/DeleteConfirmModal.tsx`)
- Prevents accidental deletions
- Shows warning message with story title
- Requires explicit confirmation

#### My Stories Page (`app/my-stories/page.tsx`)
- Calls `apiStorageService.deleteStory(id)`
- Updates local state to remove deleted story from view
- **Shows success message** after successful deletion with auto-dismiss (5 seconds)
- **Shows error message** if deletion fails with auto-dismiss (7 seconds)
- Both messages can be manually closed by clicking the × button

#### API Storage Service (`services/apiStorageService.ts`)
- Makes DELETE request to `/api/stories/${id}`
- Includes credentials for authentication
- Handles errors appropriately

## Security Features

1. **Authentication Required** - Users must be logged in to delete stories
2. **Authorization Check** - Users can only delete their own stories
3. **Confirmation Modal** - Prevents accidental deletions
4. **Error Handling** - Graceful error messages if deletion fails

## Data Flow

```
User clicks delete button
    ↓
Confirmation modal appears
    ↓
User confirms deletion
    ↓
Frontend calls apiStorageService.deleteStory()
    ↓
API endpoint receives DELETE request
    ↓
Verify user authentication
    ↓
Fetch story to get image URLs
    ↓
Delete images from Cloudinary
    ↓
Delete story from MongoDB
    ↓
Return success response
    ↓
Frontend removes story from view
```

## Testing the Feature

### Prerequisites
- User must be logged in
- User must have at least one story created
- Stories should have images uploaded to Cloudinary

### Steps to Test
1. Navigate to "My Stories" page
2. Find a story you want to delete
3. Click the trash icon button
4. Confirm deletion in the modal
5. Verify:
   - Story is removed from the list
   - Images are deleted from Cloudinary (check Cloudinary dashboard)
   - Story is deleted from MongoDB (check database)

### Expected Behavior
- ✅ Story disappears from "My Stories" immediately
- ✅ **Success message appears**: "Story deleted successfully! All images have been removed."
- ✅ Success message auto-dismisses after 5 seconds
- ✅ All scene images are deleted from Cloudinary
- ✅ Cover image is deleted from Cloudinary (if exists)
- ✅ Story document is removed from MongoDB
- ✅ Console logs show deletion progress
- ✅ No orphaned images remain in Cloudinary

### Error Behavior
- ❌ **Error message appears** if deletion fails
- ❌ Error message shows specific reason (authentication, not found, etc.)
- ❌ Error message auto-dismisses after 7 seconds
- ❌ User can manually close messages by clicking the × button

### Error Cases Handled
- User not authenticated → 401 error → "Not authenticated" message
- Story not found → 404 error → "Story not found" message
- Story belongs to different user → 404 error (for security) → "Story not found" message
- Cloudinary deletion fails → Story still deleted from database (logged as warning)
- Network error → Error message shown to user with retry option
- All error messages auto-dismiss after 7 seconds or can be manually closed

## Cloudinary URL Format
The delete function extracts public_ids from Cloudinary URLs in these formats:
- `https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{format}`
- `https://res.cloudinary.com/{cloud_name}/image/upload/{folder}/{public_id}.{format}`

## Important Notes

1. **Permanent Deletion** - Once deleted, stories and images cannot be recovered
2. **Cascading Delete** - All related data is removed (story + all images)
3. **Cloudinary Fallback** - If Cloudinary deletion fails, the story is still removed from the database to prevent orphaned records
4. **Authorization** - Users can only delete their own stories, preventing unauthorized deletions
5. **Atomic Operation** - Images are deleted before the story to ensure cleanup happens even if database deletion fails

## Future Improvements

1. **Soft Delete** - Implement a "trash" feature where stories are marked as deleted but recoverable for 30 days
2. **Batch Delete** - Allow users to select and delete multiple stories at once
3. **Archive** - Option to archive stories instead of permanently deleting
4. **Backup** - Create backups before deletion for admin recovery
5. **Usage Analytics** - Track which stories are deleted most often to improve the platform
