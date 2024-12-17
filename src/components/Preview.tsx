import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  html: string;
}

const Preview = ({ html }: PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    console.log('Preview updating with new HTML content');
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        // Add default styles for email preview
        const styles = `
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
          </style>
        `;
        
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              ${styles}
            </head>
            <body>
              ${html}
            </body>
          </html>
        `);
        doc.close();
        
        console.log('Preview iframe updated successfully');
      }
    }
  }, [html]);

  return (
    <div className="h-full w-full bg-white rounded-lg overflow-hidden border border-gray-200">
      <iframe
        ref={iframeRef}
        title="Email Preview"
        className="w-full h-full border-0"
        sandbox="allow-same-origin"
      />
    </div>
  );
};

export default Preview;