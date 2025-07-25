"use client";

// import { sessionManager, Session } from './session';
import { useState, useEffect } from 'react';

// Client-side only session manager wrapper
class ClientSessionManager {
  private static instance: ClientSessionManager;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ClientSessionManager {
    if (!ClientSessionManager.instance) {
      ClientSessionManager.instance = new ClientSessionManager();
    }
    return ClientSessionManager.instance;
  }

  // Initialize session manager (client-side only)
  initialize(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!this.isInitialized) {
      // Force session manager to load session
      sessionManager.getSession();
      this.isInitialized = true;
    }
  }

  // Get session (client-side only)
  getSession(): Session | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return sessionManager.getSession();
  }

  // Set session (client-side only)
  setSession(session: Session): void {
    if (typeof window === 'undefined') {
      return;
    }
    sessionManager.setSession(session);
  }

  // Clear session (client-side only)
  clearSession(): void {
    if (typeof window === 'undefined') {
      return;
    }
    sessionManager.clearSession();
  }

  // Check authentication (client-side only)
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return sessionManager.isAuthenticated();
  }

  // Check role (client-side only)
  hasRole(role: string): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return sessionManager.hasRole(role);
  }

  // Check any role (client-side only)
  hasAnyRole(roles: string[]): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return sessionManager.hasAnyRole(roles);
  }

  // Get token (client-side only)
  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return sessionManager.getToken();
  }

  // Create mock session (client-side only)
  createMockSession(email: string, role: string): Session {
    if (typeof window === 'undefined') {
      throw new Error('Cannot create session on server side');
    }
    return sessionManager.createMockSession(email, role);
  }

  // Subscribe to changes (client-side only)
  subscribe(listener: (session: Session | null) => void): () => void {
    if (typeof window === 'undefined') {
      return () => {};
    }
    return sessionManager.subscribe(listener);
  }

  // Refresh session (client-side only)
  async refreshSession(): Promise<boolean> {
    if (typeof window === 'undefined') {
      return false;
    }
    return sessionManager.refreshSession();
  }
}

// Export singleton instance
export const clientSessionManager = ClientSessionManager.getInstance();

// Hook for using session in components (client-side only)
export function useClientSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    // Initialize session manager
    clientSessionManager.initialize();

    // Subscribe to session changes
    const unsubscribe = clientSessionManager.subscribe((newSession) => {
      setSession(newSession);
    });

    // Get initial session
    const currentSession = clientSessionManager.getSession();
    setSession(currentSession);
    setIsLoading(false);

    return unsubscribe;
  }, []);

  return {
    session,
    user: session?.user || null,
    isAuthenticated: !!session,
    hasRole: (role: string) => clientSessionManager.hasRole(role),
    hasAnyRole: (roles: string[]) => clientSessionManager.hasAnyRole(roles),
    logout: () => clientSessionManager.clearSession(),
    refresh: () => clientSessionManager.refreshSession(),
    isLoading
  };
} 