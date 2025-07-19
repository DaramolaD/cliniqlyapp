"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Stethoscope, Building, User } from "lucide-react";

export function PublicNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">Cliniqly</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </Link>
            
            {/* Portal Links */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="health-btn-secondary" asChild>
                <Link href="/client/login" className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Patient Portal
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="health-btn-secondary" asChild>
                <Link href="/staff/login" className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  Staff Portal
                </Link>
              </Button>
              <Button className="health-btn-primary" asChild>
                <Link href="/client/register">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-border">
            <Link href="/features" className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors">
              Contact
            </Link>
            
            {/* Mobile Portal Links */}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full health-btn-secondary" asChild>
                <Link href="/client/login" className="flex items-center justify-center">
                  <User className="w-4 h-4 mr-2" />
                  Patient Portal
                </Link>
              </Button>
              <Button variant="outline" className="w-full health-btn-secondary" asChild>
                <Link href="/staff/login" className="flex items-center justify-center">
                  <Building className="w-4 h-4 mr-2" />
                  Staff Portal
                </Link>
              </Button>
              <Button className="health-btn-primary w-full" asChild>
                <Link href="/client/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 