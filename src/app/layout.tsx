import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ludis — Athlete Performance Engine",
  description:
    "AI-powered sports performance analysis and injury-risk awareness. Transform your training data into personalized performance, recovery, and readiness insights.",
  keywords: [
    "athlete performance",
    "sports analytics",
    "recovery analysis",
    "fatigue monitoring",
    "training insights",
  ],
  icons: {
    icon: "/LudisLogo1.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
