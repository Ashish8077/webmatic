"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../schemas/change-password.schema";
import { useChangePassword } from "../hooks/use-change-password";

export function ChangePasswordForm() {
  const changePasswordMutation = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ChangePasswordFormValues) {
    try {
      await changePasswordMutation.mutateAsync(values);
      toast.success("Password changed successfully. Please log in again.");
    } catch {
      toast.error(
        changePasswordMutation.error?.message || "Failed to change password.",
      );
    }
  }

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Change Password
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Update your password. You will be logged out after changing your
          password.
        </p>
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("currentPassword")}
            error={errors.currentPassword?.message}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("newPassword")}
            error={errors.newPassword?.message}
            hint="Minimum 8 characters"
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting || changePasswordMutation.isPending}
            className="w-full"
          >
            Update Password
          </Button>
        </form>

        {changePasswordMutation.isError && (
          <p className="text-red-500 mt-5 text-center text-sm">
            {changePasswordMutation.error.message}
          </p>
        )}
      </div>
    </div>
  );
}
