import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen max-w-full justify-center bg-neutral-900 p-2 text-xs text-slate-100 md:text-sm">
      <div className="container flex h-full max-w-4xl flex-col self-center">
        {children}
      </div>
    </div>
  );
}
