
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonial = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
          </div>
          
          <Card className="bg-white border-0 shadow-xl">
            <CardContent className="px-3 py-12 md:p-12">
              <blockquote className="text-lg md:text-xl text-gray-900 leading-relaxed mb-8">
              &quot;Before Cliniqly, our scheduling was chaos. In under a month, Luxan helped us launch a system that not only reduced no-shows but made us look more professional to clients.&quot;
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DR</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-lg">Dr. Rachel Kim</div>
                  <div className="text-gray-600">Family Medicine Practice</div>
                  <div className="text-sm text-gray-500">San Francisco, CA</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-gray-600">Healthcare professionals trust Cliniqly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Appointments booked successfully</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-gray-600">Average customer satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
