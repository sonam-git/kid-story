import { NextResponse } from 'next/server';

export async function GET() {
  const isConfigured = !!process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    configured: isConfigured,
    message: isConfigured 
      ? 'OpenAI API is configured' 
      : 'OpenAI API key not found. Please add OPENAI_API_KEY to .env.local'
  });
}
