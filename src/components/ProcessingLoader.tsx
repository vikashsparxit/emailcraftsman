import React, { useEffect, useState } from 'react';
import { Progress } from './ui/progress';
import { Loader2 } from 'lucide-react';

interface ProcessingLoaderProps {
  currentStep: number;
}

const ProcessingLoader = ({ currentStep }: ProcessingLoaderProps) => {
  const [progress, setProgress] = useState(0);
  
  const steps = [
    'Preparing image for processing...',
    'Uploading image to server...',
    'Analyzing image layout and structure...',
    'Identifying components and styles...',
    'Generating responsive HTML template...',
    'Implementing dark mode support...',
    'Adding email client compatibility...',
    'Finalizing template generation...'
  ];

  useEffect(() => {
    const targetProgress = (currentStep / steps.length) * 100;
    const increment = 1;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= targetProgress) {
          clearInterval(interval);
          return prev;
        }
        return Math.min(prev + increment, targetProgress);
      });
    }, 20);

    return () => clearInterval(interval);
  }, [currentStep, steps.length]);

  return (
    <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-blue-500 text-lg font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-100 mt-6 mb-2">
            Generating Your Email Template
          </h2>
          
          <p className="text-lg text-blue-400 text-center mb-6 min-h-[28px] transition-all">
            {steps[currentStep - 1]}
          </p>
          
          <Progress value={progress} className="w-full h-2" />
          
          <div className="w-full mt-8 space-y-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 transition-all ${
                  index + 1 === currentStep
                    ? 'text-blue-400'
                    : index + 1 < currentStep
                    ? 'text-gray-400 line-through'
                    : 'text-gray-500'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  index + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-600'
                }`} />
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingLoader;