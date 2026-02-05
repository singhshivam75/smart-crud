import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google"; // Swapping to Outfit for headings, Inter for body
import "./globals.css";
import Link from "next/link";
import { Bell, User } from "lucide-react";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SmartCRUD | Premium User Management",
  description: "Modern user management system built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">

        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-indigo-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  S
                </div>
                <Link href="/" className="font-heading font-bold text-xl text-slate-800 tracking-tight">
                  Smart<span className="text-indigo-600">CRUD</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Dashboard
                </Link>
                <Link href="/users/create" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  New User
                </Link>
                <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Settings
                </a>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500">
                  <span className="sr-only">Notifications</span>
                  <Bell className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto w-full animate-fade-in">
            {children}
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-slate-400">
              © {new Date().getFullYear()} SmartCRUD. Built with Next.js & Tailwind.
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
