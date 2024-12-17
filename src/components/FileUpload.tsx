import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Key } from 'lucide-react';
import { toast } from 'sonner';
import { getApiKey } from '@/utils/indexDB';
import { Button } from './ui/button';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isCheckingKey, setIsCheckingKey] = useState(true);

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const key = await getApiKey();
        console.log('Checking API key status:', !!key);
        setHasApiKey(!!key);
      } catch (error) {
        console.error('Error checking API key:', error);
        setHasApiKey(false);
      } finally {
        setIsCheckingKey(false);
      }
    };
    checkApiKey();
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!hasApiKey) {
      toast.error('Please add your Claude API key first');
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith('image/')) {
        console.log('Processing file:', file.name);
        onFileUpload(file);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Please upload an image file');
      }
    }
  }, [onFileUpload, hasApiKey]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false,
    disabled: !hasApiKey
  });

  const handleAddApiKey = () => {
    const apiKeyButton = document.querySelector<HTMLElement>('[aria-label="API Keys"]');
    if (apiKeyButton) {
      apiKeyButton.click();
    } else {
      toast.error('API key settings button not found');
    }
  };

  if (isCheckingKey) {
    return (
      <div className="border-2 border-dashed border-gray-600 rounded-lg h-[250px] flex items-center justify-center">
        <p className="text-gray-400">Checking API key status...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg h-[250px] flex flex-col items-center justify-center transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50/5' : 'border-gray-600 hover:border-gray-500'}
          ${!hasApiKey ? 'filter blur-sm' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mb-4 text-gray-400" />
        <p className="text-lg text-gray-300">
          {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
        </p>
        <p className="mt-2 text-sm text-gray-500">Supports PNG, JPG, JPEG, GIF</p>
      </div>

      {!hasApiKey && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-lg">
          <div className="text-center p-6">
            <Key className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Claude API Key Required</h3>
            <p className="text-gray-400 mb-4">Please add your Claude API key to start generating templates.</p>
            <Button 
              onClick={handleAddApiKey}
              variant="default"
            >
              Add API Key
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;