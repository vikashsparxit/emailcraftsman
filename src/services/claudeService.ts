import { supabase } from "@/integrations/supabase/client";

interface GenerateTemplateResponse {
  template: string;
}

export const generateEmailTemplate = async (imageBase64: string): Promise<string> => {
  console.log('Generating email template from image...');
  
  try {
    const { data, error } = await supabase.functions.invoke<GenerateTemplateResponse>('generate-template', {
      body: { imageBase64 }
    });

    if (error) {
      console.error('Error generating template:', error);
      throw error;
    }

    if (!data?.template) {
      throw new Error('No template received from the API');
    }

    console.log('Template generated successfully');
    return data.template;
  } catch (error: any) {
    console.error('Error generating template:', error);
    throw error;
  }
};