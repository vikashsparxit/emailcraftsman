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
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
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
      throw new Error(errorData.error?.message || 'Failed to generate template');
    }

    const data: GenerateTemplateResponse = await response.json();
    console.log('Template generated successfully');
    return data.content[0].text;
  } catch (error) {
    console.error('Error generating template:', error);
    throw error;
  }
};