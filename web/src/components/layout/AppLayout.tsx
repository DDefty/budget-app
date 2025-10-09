import React from "react";
import Topbar from "./Topbar";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-light text-foreground">
      <div className="flex">
        <main className="flex-1 "> 
          <Topbar />
          <section className="flex-1 p-6 sm:p-8">{children}</section>
        </main>
      </div>
    </div>
  );
}