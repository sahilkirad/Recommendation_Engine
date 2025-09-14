// File: packages/platform-frontend/src/components/layout/DashboardLayout.tsx
import React from 'react';
import { LayoutDashboard, Book, GanttChartSquare, Settings } from 'lucide-react';

// This is a simple data structure for our navigation links.
// In a real app, this might be more complex.
const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Catalog', href: '/catalog', icon: Book },
  { name: 'Business Rules', href: '/rules', icon: GanttChartSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-64 flex-col border-r bg-muted/40 p-4 sm:flex">
        <div className="mb-8 flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">NexusAI</span>
        </div>
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}