import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
<<<<<<< HEAD
  title: 'Boxspace',
=======
  title: 'Interactive Vision',
>>>>>>> e04a2844829d3fbd0d7abd2e4746a1afb0336bed
  description: 'An immersive 3D web experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
=======
    <html lang="en" className="dark">
      <head>
>>>>>>> e04a2844829d3fbd0d7abd2e4746a1afb0336bed
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
