import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Toaster } from 'sonner'
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('relative h-full antialiased', inter.className)}>
        <Providers>
          <main className="relative flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex-1">
              {children}
            </div>
          </main>
          <Footer />
          <Toaster position="top-center"/>
        </Providers>
      </body>
    </html>
  );
}
