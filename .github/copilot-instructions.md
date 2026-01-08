# Copilot Instructions for Story Magic

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a kid-friendly AI storytelling web application built with Next.js, TypeScript, and Tailwind CSS. The app allows children (ages 5-10) to create their own AI-generated stories with custom characters, genres, and illustrations.

## Code Style Guidelines

### TypeScript
- Use strict TypeScript with proper type definitions
- Prefer interfaces over types for object shapes
- Use `'use client'` directive for client components
- Always handle async/await with proper error handling

### React/Next.js
- Use functional components with hooks
- Prefer `'use client'` for interactive components
- Use Next.js App Router conventions
- Implement proper loading and error states

### Styling
- Use Tailwind CSS for all styling
- Follow kid-friendly design principles:
  - Large, touch-friendly buttons
  - Bright, cheerful colors
  - Simple, clear language
  - High contrast for readability
  - Playful animations and transitions

### Component Structure
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types and validation
- Include JSDoc comments for complex functions

## Kid-Safety Priorities
- All generated content must be age-appropriate (ages 5-10)
- No scary, violent, or inappropriate themes
- Simple, encouraging language
- Positive, educational messaging
- Parent-friendly defaults

## File Organization
- Components in `/components` directory
- Pages in `/app` directory (App Router)
- Services/utilities in `/services` directory
- Type definitions in `/types` directory
- Reusable hooks in `/hooks` directory (if needed)

## Testing Considerations
- Test with kid-friendly scenarios
- Ensure accessibility (screen readers, keyboard navigation)
- Test on touch devices
- Verify local storage persistence
- Test TTS functionality across browsers

## AI Integration Notes
- Current implementation uses mock AI functions
- Image generation uses placeholders
- Ready to integrate with:
  - OpenAI GPT-4 for story generation
  - DALL-E 3 for image generation
  - Alternative: Stability AI, Anthropic Claude

## Accessibility
- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Support screen readers
- High contrast text and backgrounds
