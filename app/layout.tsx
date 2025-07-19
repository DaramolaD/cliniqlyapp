import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { AuthProvider } from "@/lib/auth-context";
// import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cliniqly - Modern Clinic Management System",
  description: "Cliniqly is a modern, AI-powered clinic appointment and patient management system. Streamline your clinic operations, boost patient satisfaction, and grow your practice.",
  keywords: ["clinic", "healthcare", "appointment", "patient management", "medical software", "SaaS", "Cliniqly"],
  authors: [{ name: "Cliniqly Team" }],
  openGraph: {
    title: "Cliniqly - Modern Clinic Management System",
    description: "Cliniqly is a modern, AI-powered clinic appointment and patient management system. Streamline your clinic operations, boost patient satisfaction, and grow your practice.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cliniqly - Modern Clinic Management System",
    description: "Cliniqly is a modern, AI-powered clinic appointment and patient management system.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <AuthProvider> */}
          {/* <ToastProvider> */}
            {children}
          {/* </ToastProvider> */}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
