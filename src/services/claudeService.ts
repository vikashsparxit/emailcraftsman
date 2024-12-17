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
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2024-01-01',
        'x-api-key': apiKey,
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
  } catch (error) {
    console.error('Error generating template:', error);
    
    // Check if it's a network error (CORS or connection issues)
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      toast.error('Network error. Please check your internet connection and try again.');
      throw new Error('Network error while connecting to Claude API');
    }

    throw error;
  }
};