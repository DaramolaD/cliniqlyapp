// "use client";

// // import { jwtDecode } from "jwt-decode";
// import { useState, useEffect } from "react";

// export interface Session {
//   user: {
//     id: string;
//     email: string;
//     name: string;
//     role: "client" | "staff" | "admin";
//   };
//   token: string;
//   expiresAt: number;
// }

// export interface TokenPayload {
//   sub: string;
//   email: string;
//   name: string;
//   role: "client" | "staff" | "admin";
//   iat: number;
//   exp: number;
// }

// class SessionManager {
//   private static instance: SessionManager;
//   private session: Session | null = null;
//   private listeners: Set<(session: Session | null) => void> = new Set();

//   private constructor() {
//     this.loadSession();
//   }

//   static getInstance(): SessionManager {
//     if (!SessionManager.instance) {
//       SessionManager.instance = new SessionManager();
//     }
//     return SessionManager.instance;
//   }

//   // Load session from localStorage
//   private loadSession(): void {
//     // Check if we're in a browser environment
//     if (typeof window === 'undefined') {
//       return;
//     }

//     try {
//       const sessionData = localStorage.getItem('session');
//       if (sessionData) {
//         this.session = JSON.parse(sessionData);
//         this.validateSession();
//       }
//     } catch (error) {
//       console.error('Error loading session:', error);
//       this.clearSession();
//     }
//   }

//   // Validate session and check if token is expired
//   private validateSession(): void {
//     if (!this.session) return;

//     try {
//       // Handle mock tokens differently
//       if (this.session.token.startsWith('mock-')) {
//         const tokenData = this.session.token.substring(5); // Remove 'mock-' prefix
//         const payload = JSON.parse(atob(tokenData)) as TokenPayload;
//         const now = Date.now() / 1000;

//         if (payload.exp < now) {
//           console.log('Session expired');
//           this.clearSession();
//         }
//       } else {
//         // Handle real JWT tokens
//         // const payload = jwtDecode<TokenPayload>(this.session.token);
//         const now = Date.now() / 1000;

//         if (payload.exp < now) {
//           console.log('Session expired');
//           this.clearSession();
//         }
//       }
//     } catch (error) {
//       console.error('Error validating session:', error);
//       this.clearSession();
//     }
//   }

//   // Set session
//   setSession(session: Session): void {
//     this.session = session;
    
//     // Only access localStorage in browser environment
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('session', JSON.stringify(session));
//     }
    
//     this.notifyListeners();
//   }

//   // Get current session
//   getSession(): Session | null {
//     this.validateSession();
//     return this.session;
//   }

//   // Get user from session
//   getUser() {
//     return this.session?.user || null;
//   }

//   // Get token from session
//   getToken(): string | null {
//     this.validateSession();
//     return this.session?.token || null;
//   }

//   // Check if user is authenticated
//   isAuthenticated(): boolean {
//     return this.session !== null;
//   }

//   // Check if user has specific role
//   hasRole(role: string): boolean {
//     return this.session?.user.role === role;
//   }

//   // Check if user has any of the specified roles
//   hasAnyRole(roles: string[]): boolean {
//     return roles.includes(this.session?.user.role || '');
//   }

//   // Clear session
//   clearSession(): void {
//     this.session = null;
    
//     // Only access localStorage in browser environment
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('session');
//     }
    
//     this.notifyListeners();
//   }

//   // Refresh session
//   async refreshSession(): Promise<boolean> {
//     try {
//       const token = this.getToken();
//       if (!token) return false;

//       // In production, make API call to refresh token
//       const response = await fetch('/api/auth/refresh', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const newSession = await response.json();
//         this.setSession(newSession);
//         return true;
//       } else {
//         this.clearSession();
//         return false;
//       }
//     } catch (error) {
//       console.error('Error refreshing session:', error);
//       this.clearSession();
//       return false;
//     }
//   }

//   // Subscribe to session changes
//   subscribe(listener: (session: Session | null) => void): () => void {
//     this.listeners.add(listener);
//     return () => {
//       this.listeners.delete(listener);
//     };
//   }

//   // Notify listeners of session changes
//   private notifyListeners(): void {
//     this.listeners.forEach(listener => listener(this.session));
//   }

//   // Create mock session for demo
//   createMockSession(email: string, role: string): Session {
//     const mockUser = {
//       "client@example.com": { name: "John Doe", role: "client" },
//       "staff@example.com": { name: "Dr. Sarah Johnson", role: "staff" },
//       "admin@example.com": { name: "Admin Manager", role: "admin" }
//     };

//     const user = mockUser[email as keyof typeof mockUser];
//     if (!user) {
//       throw new Error('Invalid user');
//     }

//     // Validate that the provided role matches the user's role
//     if (user.role !== role) {
//       throw new Error('Role mismatch');
//     }

//     // Create mock JWT token
//     const payload: TokenPayload = {
//       sub: "1",
//       email,
//       name: user.name,
//       role: user.role as "client" | "staff" | "admin",
//       iat: Date.now() / 1000,
//       exp: (Date.now() / 1000) + (24 * 60 * 60) // 24 hours
//     };

//     // Create a simple mock token (not a real JWT to avoid validation issues)
//     const mockToken = `mock-${btoa(JSON.stringify(payload))}`;

//     return {
//       user: {
//         id: "1",
//         email,
//         name: user.name,
//         role: user.role as "client" | "staff" | "admin"
//       },
//       token: mockToken,
//       expiresAt: payload.exp * 1000
//     };
//   }
// }

// // Export singleton instance
// export const sessionManager = SessionManager.getInstance();

// // Hook for using session in components
// export function useSession() {
//   const [session, setSession] = useState<Session | null>(sessionManager.getSession());

//   useEffect(() => {
//     const unsubscribe = sessionManager.subscribe(setSession);
//     return unsubscribe;
//   }, []);

//   return {
//     session,
//     user: session?.user || null,
//     isAuthenticated: !!session,
//     hasRole: (role: string) => sessionManager.hasRole(role),
//     hasAnyRole: (roles: string[]) => sessionManager.hasAnyRole(roles),
//     logout: () => sessionManager.clearSession(),
//     refresh: () => sessionManager.refreshSession()
//   };
// }

// // Utility functions
// export function getAuthHeaders(): Record<string, string> {
//   const token = sessionManager.getToken();
//   return token ? { 'Authorization': `Bearer ${token}` } : {};
// }

// export function isTokenExpired(token: string): boolean {
//   try {
//     const payload = jwtDecode<TokenPayload>(token);
//     const now = Date.now() / 1000;
//     return payload.exp < now;
//   } catch {
//     return true;
//   }
// }

// export function decodeToken(token: string): TokenPayload | null {
//   try {
//     // return jwtDecode<TokenPayload>(token);
//   } catch {
//     return null;
//   }
// } 