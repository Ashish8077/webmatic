"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AUTH_ROUTES } from "@/modules/auth/constants/routes";

export function AdminNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background elements minimal for admin */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md mx-auto animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold text-muted mb-6">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Admin page not found
        </h2>
        <p className="text-muted-foreground mb-8">
          The management page you are looking for does not exist or you don't have permission to access it.
        </p>
        
        <Link href={AUTH_ROUTES.DASHBOARD}>
          <Button variant="primary" size="lg">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
