import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Customer Speaks</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-700 mb-4">
                "Email Crafter has revolutionized our email template creation process. What used to take hours now takes minutes!"
              </p>
              <p className="font-semibold text-gray-900">Sarah Johnson</p>
              <p className="text-sm text-gray-600">Marketing Director, TechCorp</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-700 mb-4">
                "The AI-powered conversion is incredibly accurate. It's like having a professional email developer on standby."
              </p>
              <p className="font-semibold text-gray-900">Michael Chen</p>
              <p className="text-sm text-gray-600">Founder, StartupX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};