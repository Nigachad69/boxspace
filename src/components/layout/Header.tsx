'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Phone, Info, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const BoxspaceLogo = () => (
  <svg
    className="h-8 w-8 text-primary"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="1" />
    <path
      d="M50 2 L50 98 M2 50 L98 50 M26 26 L74 74 M26 74 L74 26"
      stroke="currentColor"
      strokeWidth="0.5"
    />
    {Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * Math.PI) / 3;
      const x1 = 50 + 24 * Math.cos(angle);
      const y1 = 50 + 24 * Math.sin(angle);
      const x2 = 50 + 48 * Math.cos(angle + Math.PI / 6);
      const y2 = 50 + 48 * Math.sin(angle + Math.PI / 6);
      return (
        <g key={i}>
          <circle cx={x1} cy={y1} r="2" fill="currentColor" />
          <line
            x1="50"
            y1="50"
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx={50 + 48 * Math.cos(angle)}
            cy={50 + 48 * Math.sin(angle)}
            r="2"
            fill="currentColor"
          />
          <line
            x1={50 + 48 * Math.cos(angle)}
            y1={50 + 48 * Math.sin(angle)}
            x2={50 + 48 * Math.cos(angle + (2 * Math.PI) / 6)}
            y2={50 + 48 * Math.sin(angle + (2 * Math.PI) / 6)}
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
      );
    })}
  </svg>
);

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'HOME', icon: Home, isHome: true },
    { href: '/about', label: 'ABOUT US', icon: Info },
    { href: '/#services', label: 'CORPORATE SERVICES' },
    { href: '/#individual-services', label: 'INDIVIDUAL SERVICES' },
    { href: '/contact', label: 'CONTACT US', icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <BoxspaceLogo />
            <div>
              <span className="font-headline text-2xl font-bold">Boxspace</span>
              <p className="text-xs text-muted-foreground tracking-wider">
                An ISO 9001:2015 CERTIFIED COMPANY
              </p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map(({ href, label, icon: Icon, isHome }) => (
              <Button variant="ghost" asChild key={label}>
                <Link
                  href={href}
                  className={cn('flex items-center gap-1.5', {
                    'text-primary': pathname === href || (isHome && pathname === '/'),
                    'hover:text-primary': true,
                  })}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
             <Phone className="h-8 w-8 text-primary animate-pulse" />
             <div>
                <p className="text-xs font-semibold">CALL US NOW</p>
                <p className="font-bold text-base text-accent">+91 8591-439-244</p>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
