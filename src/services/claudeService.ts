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
    // Remove mode: 'cors' and CORS headers since they should be handled server-side
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2024-01-01',
        'x-api-key': apiKey
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
    
    // If it's a CORS error, provide a more helpful message
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      const errorMessage = 'Unable to connect to Claude API directly. You may need to use a proxy server or serverless function to make this request.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    // For all other errors
    const genericError = error.message || 'An error occurred while generating the template';
    toast.error(genericError);
    throw error;
  }
};