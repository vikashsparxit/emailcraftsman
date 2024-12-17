import React from 'react';
import { Progress } from './ui/progress';
import { Loader2 } from 'lucide-react';

interface ProcessingLoaderProps {
  currentStep: number;
}

const ProcessingLoader = ({ currentStep }: ProcessingLoaderProps) => {
  const steps = [
    'Analyzing image...',
    'Identifying layout and components...',
    'Generating HTML structure...',
    'Applying styles...',
    'Finalizing template...'
  ];

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <h2 className="text-2xl font-semibold text-gray-100 mb-2">
            Processing Your Design
          </h2>
          <p className="text-gray-400 text-center mb-6">
            {steps[currentStep - 1]}
          </p>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500 mt-2">
            Step {currentStep} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingLoader;