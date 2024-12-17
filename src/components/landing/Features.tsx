import React from 'react';
import { Star, Check, MessageCircle } from 'lucide-react';

export const Features = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Powerful Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Star className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">AI-Powered Conversion</h3>
          <p className="text-gray-600">
            Advanced AI technology that understands design patterns and generates clean, responsive code.
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Check className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Real-time Preview</h3>
          <p className="text-gray-600">
            See your changes instantly with our live preview feature. Edit and perfect your template in real-time.
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Export Ready</h3>
          <p className="text-gray-600">
            Download your template as HTML file, ready to use in your email marketing campaigns.
          </p>
        </div>
      </div>
    </div>
  );
};