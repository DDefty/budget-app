import React from "react";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <aside className="w-64 p-4 border-r">Sidebar</aside>
        <main className="flex-1">
          <header className="p-4 border-b">Topbar</header>
          <section className="p-6 max-w-5xl mx-auto">{children}</section>
        </main>
      </div>
    </div>
  );
}