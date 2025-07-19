"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const StickyButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 500; // Show after 500px scroll
      setIsVisible(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button 
        size="lg" 
        className="bg-primary hover:bg-primary/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full px-6 py-3"
      >
        Try for Free
      </Button>
    </div>
  );
};

export default StickyButton;
