import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GenerateTemplateResponse {
  html: string;
  error?: string;
  details?: string;
}

export const generateEmailTemplate = async (imageBase64: string, prompt: string): Promise<string> => {
  console.log('Generating email template with Claude...');
  
  try {
    const { data, error } = await supabase.functions.invoke<GenerateTemplateResponse>('generate-template', {
      body: { 
        imageBase64,  // Keep consistent with Edge Function expectation
        prompt
      }
    });

    if (error) {
      console.error('Error calling generate-template function:', error);
      toast.error(`Error: ${error.message}`);
      throw new Error('Failed to generate template');
    }

    if (!data) {
      console.error('No data received from function');
      toast.error('No response received from server');
      throw new Error('No response received from server');
    }

    if (data.error) {
      console.error('Template generation error:', data.error, data.details);
      toast.error(`Error: ${data.error}`);
      throw new Error(data.error);
    }

    if (!data.html) {
      console.error('No HTML template received from Claude');
      toast.error('Failed to generate template');
      throw new Error('No template generated');
    }

    console.log('Template generated successfully');
    toast.success('Template generated successfully');
    return data.html;
  } catch (error: any) {
    console.error('Error in generateEmailTemplate:', error);
    toast.error(error.message || 'Failed to generate template');
    throw error;
  }
};