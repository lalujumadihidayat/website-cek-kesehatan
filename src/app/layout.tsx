import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slebewwwww - Platform Kesehatan Digital",
  description: "Platform kesehatan digital modern yang membantu Anda memantau dan menganalisis kondisi kesehatan secara otomatis.",
  keywords: ["Slebewwwww", "kesehatan", "analisis kesehatan", "AI", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Slebewwwww Team" }],
  openGraph: {
    title: "Slebewwwww - Platform Kesehatan Digital",
    description: "Platform kesehatan digital modern dengan AI-powered analysis",
    url: "https://chat.z.ai", 
    siteName: "Slebewwwww",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slebewwwww - Platform Kesehatan Digital",
    description: "Platform kesehatan digital modern dengan AI-powered analysis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
