"use client";

import { Loader2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "health" | "spinner";
  text?: string;
  className?: string;
}

export function Loading({ size = "md", variant = "default", text, className }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  if (variant === "health") {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
        <div className="relative">
          <Heart className={cn("text-red-500 animate-pulse", sizeClasses[size])} />
          <div className="absolute inset-0">
            <Heart className={cn("text-red-300 animate-ping", sizeClasses[size])} />
          </div>
        </div>
        {text && (
          <p className={cn("text-muted-foreground", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "spinner") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
        {text && (
          <span className={cn("ml-2 text-muted-foreground", textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center space-y-2">
        <div className="relative">
          <div className={cn(
            "border-2 border-gray-300 border-t-primary rounded-full animate-spin",
            sizeClasses[size]
          )} />
        </div>
        {text && (
          <p className={cn("text-muted-foreground", textSizeClasses[size])}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

// Full page loading component
export function PageLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loading size="lg" variant="health" text={text} />
      </div>
    </div>
  );
}

// Skeleton loading component
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-muted rounded", className)} />
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-3">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      ))}
    </div>
  );
} 