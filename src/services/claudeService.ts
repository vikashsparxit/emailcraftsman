import { toast } from "sonner";

interface GenerateTemplateResponse {
  content: Array<{
    text: string;
    type: string;
  }>;
}

export const generateEmailTemplate = async (imageBase64: string, apiKey: string): Promise<string> => {
  console.log('Generating email template from image...');
  
  if (!apiKey) {
    throw new Error('Claude API key is required');
  }

  try {
    // Add mode: 'cors' and additional headers
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2024-01-01',
        'x-api-key': apiKey,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, anthropic-version, x-api-key'
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
                data: imageBase64.split(',')[1]
              }
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API error:', errorData);
      
      if (response.status === 401) {
        toast.error('Invalid API key. Please check your Claude API key in settings.');
        throw new Error('Invalid API key');
      }
      
      if (response.status === 429) {
        toast.error('Rate limit exceeded. Please try again later.');
        throw new Error('Rate limit exceeded');
      }

      throw new Error(errorData.error?.message || 'Failed to generate template');
    }

    const data: GenerateTemplateResponse = await response.json();
    
    if (!data.content?.[0]?.text) {
      throw new Error('Invalid response format from Claude API');
    }

    console.log('Template generated successfully');
    return data.content[0].text;
  } catch (error: any) {
    console.error('Error generating template:', error);
    
    // Enhanced error handling
    if (error.message.includes('Failed to fetch') || error.message.includes('Network error')) {
      const errorMessage = 'Unable to connect to Claude API. This might be due to CORS restrictions. Please ensure you have the correct API key and try again.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    // If it's a CORS error
    if (error.message.includes('CORS')) {
      const corsError = 'CORS error: Unable to access Claude API directly. Please check your API key and try again.';
      toast.error(corsError);
      throw new Error(corsError);
    }

    // For all other errors
    const genericError = error.message || 'An error occurred while generating the template';
    toast.error(genericError);
    throw error;
  }
};