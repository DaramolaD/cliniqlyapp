
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Cliniqly</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
          <a href="#faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Try for Free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
