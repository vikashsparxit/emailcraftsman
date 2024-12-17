import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GenerateTemplateResponse {
  template: string;
  error?: string;
  details?: string;
}

export const generateEmailTemplate = async (imageBase64: string): Promise<string> => {
  console.log('Generating email template from image...');
  
  try {
    const { data, error } = await supabase.functions.invoke<GenerateTemplateResponse>('generate-template', {
      body: { imageBase64 }
    });

    if (error) {
      console.error('Supabase function error:', error);
      toast.error(`Error: ${error.message}`);
      throw new Error(error.message);
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

    if (!data.template) {
      console.error('No template received from the API');
      toast.error('Failed to generate template');
      throw new Error('No template received from the API');
    }

    console.log('Template generated successfully');
    toast.success('Template generated successfully');
    return data.template;
  } catch (error: any) {
    console.error('Error generating template:', error);
    toast.error(error.message || 'Failed to generate template');
    throw error;
  }
};