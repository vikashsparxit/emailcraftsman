import React from 'react';

export const HowItWorks = () => {
  return (
    <div className="py-16 bg-gray-50 rounded-2xl p-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="text-4xl font-bold text-purple-600">01</div>
          <h3 className="text-xl font-semibold text-gray-900">Upload Design</h3>
          <p className="text-gray-600">
            Simply drag and drop your email design image or click to upload.
          </p>
        </div>
        <div className="space-y-4">
          <div className="text-4xl font-bold text-purple-600">02</div>
          <h3 className="text-xl font-semibold text-gray-900">AI Generation</h3>
          <p className="text-gray-600">
            Our AI analyzes your design and generates clean, responsive HTML code.
          </p>
        </div>
        <div className="space-y-4">
          <div className="text-4xl font-bold text-purple-600">03</div>
          <h3 className="text-xl font-semibold text-gray-900">Export & Use</h3>
          <p className="text-gray-600">
            Edit the generated code if needed, then export your template ready for use.
          </p>
        </div>
      </div>
    </div>
  );
};