import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from '@/lib/context/ThemeContext';
import { SideNav } from '@/components/Dashboard/SideNav';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tener SaSS application",
  description: "Amazing SaSS solution for you and your team",
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
        <ThemeProvider>
          <div className="flex h-screen overflow-hidden">
            <div className="fixed inset-y-0"> {/* Make SideNav fixed */}
              <SideNav />
            </div>
            <main className="flex-1 overflow-y-auto ml-64">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
