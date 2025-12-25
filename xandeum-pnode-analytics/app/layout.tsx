import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Xandeum Pulse | pNode Analytics",
  description: "Real-time analytics for the Xandeum storage network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 pt-16">
              <Sidebar />
              <main className="flex-1 md:pl-64 p-6 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
