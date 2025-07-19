"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart,
  Building,
  Activity,
  Loader2
} from "lucide-react";

interface LoadingContext {
  type: 'public' | 'client' | 'admin';
  message: string;
}

export default function Loading() {
  const pathname = usePathname();
  const [context, setContext] = useState<LoadingContext>({ 
    type: 'public', 
    message: 'Loading...' 
  });

  useEffect(() => {
    // Detect context based on pathname
    if (pathname?.startsWith('/admin')) {
      setContext({ 
        type: 'admin', 
        message: 'Loading admin dashboard...' 
      });
    } else if (pathname?.startsWith('/client')) {
      setContext({ 
        type: 'client', 
        message: 'Loading your health portal...' 
      });
    } else {
      setContext({ 
        type: 'public', 
        message: 'Loading CliniQly...' 
      });
    }
  }, [pathname]);

  const getIcon = () => {
    switch (context.type) {
      case 'admin':
        return <Building className="w-8 h-8 text-primary" />;
      case 'client':
        return <Heart className="w-8 h-8 text-primary" />;
      default:
        return <Activity className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Loading Content */}
        <Card className="health-card border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                {getIcon()}
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {context.type === 'admin' && 'Admin Dashboard'}
                {context.type === 'client' && 'Patient Portal'}
                {context.type === 'public' && 'CliniQly'}
              </h2>
              
              <p className="text-muted-foreground mb-6">
                {context.message}
              </p>

              {/* Loading Animation */}
              <div className="flex justify-center mb-6">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>

              {/* Loading Dots */}
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>

            {/* Context-specific message */}
            <div className="text-sm text-muted-foreground">
              {context.type === 'admin' && 'Preparing your healthcare management tools...'}
              {context.type === 'client' && 'Securing your health information...'}
              {context.type === 'public' && 'Connecting to our healthcare platform...'}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© 2024 CliniQly. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
} 