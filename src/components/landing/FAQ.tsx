import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How accurate is the AI conversion?</AccordionTrigger>
            <AccordionContent>
              Our AI model has been trained on thousands of email templates and achieves high accuracy in converting designs to code. While occasional minor adjustments might be needed, the generated code is clean, responsive, and follows email development best practices.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What file formats are supported?</AccordionTrigger>
            <AccordionContent>
              We support common image formats including PNG, JPG, and JPEG. The uploaded design should be clear and represent the final desired layout of your email template.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I edit the generated code?</AccordionTrigger>
            <AccordionContent>
              Yes! Our built-in code editor allows you to make any necessary adjustments to the generated HTML. You can preview changes in real-time and export when ready.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Are the templates responsive?</AccordionTrigger>
            <AccordionContent>
              Yes, all generated templates are responsive by default and will look great across different email clients and devices.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
