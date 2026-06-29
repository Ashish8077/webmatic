"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";
import { useAuth } from "@/lib/auth-context";
import { AuthProvider } from "@/lib/auth-context";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
