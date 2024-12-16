import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  html: string;
}

const Preview = ({ html }: PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
      }
    }
  }, [html]);

  return (
    <div className="h-full w-full bg-white rounded-lg overflow-hidden">
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