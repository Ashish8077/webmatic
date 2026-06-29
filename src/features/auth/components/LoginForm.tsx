import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showToast } from "@/components/ui/toast";
import { useAuth } from "@/lib/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const response = await loginMutation.mutateAsync(values);

      console.log("SUCCESS", response);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-purple-500 shadow-xl shadow-accent/30 mb-5">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Sign in to your admin panel
        </p>
      </div>

      {/* Form */}
      <div className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-2xl shadow-black/30">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="admin@example.com"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full"
          >
            Sign in
          </Button>
        </form>
        {loginMutation.isError && (
          <p className="text-red-500  mt-5 text-center">
            {loginMutation.error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
