import { useState } from 'react';
import { toast } from 'sonner';
import { generateEmailTemplate } from '@/services/claudeService';
import { getApiKey } from '@/utils/indexDB';
import { supabase } from "@/integrations/supabase/client";

interface GeneratedContent {
  html: string;
  notes?: string;
}

const extractTemplateContent = (response: string): GeneratedContent => {
  const notesMatch = response.match(/Key points:\s*([\s\S]*)/);
  const notes = notesMatch ? notesMatch[1].trim() : '';
  const htmlMatch = response.match(/<html[\s\S]*<\/html>/);
  const html = htmlMatch ? htmlMatch[0] : '';
  return { html, notes: notes || undefined };
};

export const useTemplateGeneration = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [html, setHtml] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const generateTemplate = async (file: File) => {
    setIsProcessing(true);
    setProcessingStep(1);
    console.log('Processing file:', file.name);
    
    try {
      const savedKey = await getApiKey();
      if (!savedKey) {
        toast.error('Please set your Claude API key in settings first');
        return false;
      }

      const { data: promptData, error: promptError } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'email_template_prompt')
        .single();

      if (promptError) {
        console.error('Error fetching prompt template:', promptError);
        toast.error('Failed to fetch prompt template');
        return false;
      }

      const reader = new FileReader();
      return new Promise<boolean>((resolve) => {
        reader.onload = async (e) => {
          if (e.target?.result) {
            const base64Image = e.target.result as string;
            
            try {
              setProcessingStep(2);
              await new Promise(resolve => setTimeout(resolve, 1000));
              setProcessingStep(3);
              await new Promise(resolve => setTimeout(resolve, 1500));
              setProcessingStep(4);
              
              const template = await generateEmailTemplate(base64Image, promptData.setting_value);
              const { html: extractedHtml, notes: extractedNotes } = extractTemplateContent(template);
              
              setProcessingStep(5);
              await new Promise(resolve => setTimeout(resolve, 1000));
              setProcessingStep(6);
              await new Promise(resolve => setTimeout(resolve, 800));
              setProcessingStep(7);
              await new Promise(resolve => setTimeout(resolve, 800));
              setProcessingStep(8);
              
              setHtml(extractedHtml);
              setNotes(extractedNotes || '');
              toast.success('Template generated successfully');
              resolve(true);
            } catch (error) {
              console.error('Error generating template:', error);
              toast.error('Failed to generate template. Please check your API key and try again.');
              resolve(false);
            } finally {
              setIsProcessing(false);
              setProcessingStep(0);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Error processing the image');
      setIsProcessing(false);
      setProcessingStep(0);
      return false;
    }
  };

  return {
    isProcessing,
    processingStep,
    html,
    notes,
    setHtml,
    generateTemplate
  };
};