import { supabase } from '@/integrations/supabase/client';

export const generateEmailTemplate = async (imageBase64: string, prompt: string): Promise<string> => {
  console.log('Generating email template with Claude...');
  
  try {
    const { data, error } = await supabase.functions.invoke('generate-template', {
      body: { 
        image: imageBase64,
        prompt: prompt
      }
    });

    if (error) {
      console.error('Error calling generate-template function:', error);
      throw new Error('Failed to generate template');
    }

    if (!data || !data.html) {
      console.error('No HTML template received from Claude');
      throw new Error('No template generated');
    }

    console.log('Template generated successfully');
    return data.html;
  } catch (error) {
    console.error('Error in generateEmailTemplate:', error);
    throw error;
  }
};