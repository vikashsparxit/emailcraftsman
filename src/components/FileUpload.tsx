import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith('image/')) {
        onFileUpload(file);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Please upload an image file');
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg h-[250px] flex flex-col items-center justify-center transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50/5' : 'border-gray-600 hover:border-gray-500'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mb-4 text-gray-400" />
      <p className="text-lg text-gray-300">
        {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
      </p>
      <p className="mt-2 text-sm text-gray-500">Supports PNG, JPG, JPEG, GIF</p>
    </div>
  );
};

export default FileUpload;