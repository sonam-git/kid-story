#!/bin/bash

# Test Delete Story Functionality
# This script helps you test the complete delete workflow

echo "🧪 ImagiKids - Delete Story Test"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Testing delete story functionality...${NC}"
echo ""

echo "Prerequisites:"
echo "1. ✅ Server is running (npm run dev)"
echo "2. ✅ User is logged in"
echo "3. ✅ At least one story exists in 'My Stories'"
echo "4. ✅ Story has Cloudinary images"
echo ""

echo -e "${GREEN}Manual Test Steps:${NC}"
echo ""
echo "1. Open http://localhost:3000/my-stories"
echo "2. Find a test story you want to delete"
echo "3. Click the trash icon (🗑️) button"
echo "4. Confirm deletion in the modal"
echo "5. Check the console logs for:"
echo "   - 🗑️ Deleting X images from Cloudinary..."
echo "   - ✅ Successfully deleted X/X images from Cloudinary"
echo "   - Story deleted successfully"
echo "6. Verify the story is removed from the list"
echo ""

echo -e "${GREEN}Backend Verification:${NC}"
echo ""
echo "1. Check MongoDB - Story should be deleted:"
echo "   db.stories.find({ _id: ObjectId('STORY_ID') })"
echo ""
echo "2. Check Cloudinary Dashboard - Images should be deleted:"
echo "   https://cloudinary.com/console/media_library"
echo ""

echo -e "${GREEN}Expected Results:${NC}"
echo ""
echo "✅ Story disappears from My Stories page"
echo "✅ All scene images deleted from Cloudinary"
echo "✅ Cover image deleted from Cloudinary"
echo "✅ Story document removed from MongoDB"
echo "✅ Console shows successful deletion logs"
echo "✅ No errors in browser console"
echo ""

echo -e "${YELLOW}Common Issues:${NC}"
echo ""
echo "❌ 401 Error - User not authenticated"
echo "   Solution: Log in again"
echo ""
echo "❌ 404 Error - Story not found"
echo "   Solution: Verify story ID and user ownership"
echo ""
echo "❌ Cloudinary deletion warning"
echo "   Solution: Check Cloudinary credentials in .env.local"
echo ""
echo "❌ Story not removed from UI"
echo "   Solution: Check browser console for JavaScript errors"
echo ""

echo -e "${GREEN}Test a Delete Request (API):${NC}"
echo ""
echo "Replace STORY_ID with an actual story ID from your database:"
echo ""
echo "curl -X DELETE http://localhost:3000/api/stories/STORY_ID \\"
echo "  -H 'Cookie: token=YOUR_JWT_TOKEN' \\"
echo "  -H 'Content-Type: application/json'"
echo ""

echo "=================================="
echo "🎉 Ready to test delete functionality!"
echo "=================================="
