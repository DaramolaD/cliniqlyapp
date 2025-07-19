"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function ClientLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password, "client");
      
      // Redirect to returnUrl if provided, otherwise to dashboard
      const returnUrl = searchParams.get('returnUrl');
      const redirectPath = returnUrl || "/client";
      router.push(redirectPath);
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Patient Login</CardTitle>
        <p className="text-gray-600 mt-2">Access your health records and appointments</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              aria-describedby="email-error"
              className="border-gray-300 focus:border-blue-500"
            />
            {error && <p id="email-error" className="text-red-600 text-sm">{error}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                aria-describedby="password-error"
                className="border-gray-300 focus:border-blue-500 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
            aria-describedby="login-status"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          <div id="login-status" className="sr-only" aria-live="polite">
            {isLoading ? "Signing in..." : "Ready to sign in"}
          </div>

          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/client/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </div>

          <div className="text-center text-xs text-gray-500">
            Demo: Use client@example.com / password
          </div>
        </form>

        <div className="mt-6 pt-6 border-t">
          <div className="text-center text-sm text-gray-600 mb-4">
            Are you a healthcare provider?
          </div>
          <div className="flex gap-2">
            <Link href="/staff/login" className="flex-1">
              <Button variant="outline" className="w-full">
                Staff Login
              </Button>
            </Link>
            <Link href="/admin/login" className="flex-1">
              <Button variant="outline" className="w-full">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 