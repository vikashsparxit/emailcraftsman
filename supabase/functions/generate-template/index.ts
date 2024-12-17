import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const CLAUDE_API_KEY = Deno.env.get('CLAUDE_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    if (!CLAUDE_API_KEY) {
      console.error('CLAUDE_API_KEY not found in environment variables');
      throw new Error('Claude API key not configured');
    }

    const requestData = await req.json();
    console.log('Received request data:', JSON.stringify(requestData));

    const { imageBase64 } = requestData;
    if (!imageBase64) {
      console.error('No image data received');
      throw new Error('No image data provided');
    }

    // Extract the base64 data after the comma if it includes the data URL prefix
    const base64Data = imageBase64.includes('base64,') 
      ? imageBase64.split('base64,')[1] 
      : imageBase64;

    console.log('Processing image data and calling Claude API...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2024-01-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Generate a responsive HTML email template that matches this image. Use modern email-compatible HTML and inline CSS. Make it mobile-friendly.'
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: base64Data
              }
            }
          ]
        }]
      })
    });

    console.log('Claude API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', errorText);
      throw new Error(`Claude API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Claude API response received successfully');

    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error('Unexpected Claude API response format:', data);
      throw new Error('Invalid response format from Claude API');
    }

    return new Response(
      JSON.stringify({ template: data.content[0].text }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error in generate-template function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.toString()
      }),
      { 
        status: 500, // Changed from 400 to 500 for server errors
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
})