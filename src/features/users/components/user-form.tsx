import React, { useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { UserFormValues } from "../schemas/user-form.schema";
import { USER_STATUS } from "@/modules/users/constants/user.constants";
import { useRoles } from "@/features/roles/hooks/use-roles";
import { PasswordStrengthIndicator } from "@/components/shared/password-strength-indicator";
import Link from "next/link";
import { Save, ArrowLeft, Eye, EyeOff } from "lucide-react";

interface UserFormProps {
  form: UseFormReturn<UserFormValues>;
  onSubmit: (data: UserFormValues) => Promise<void> | void;
  isLoading?: boolean;
  isEdit?: boolean;
}

export default function UserForm({
  form,
  onSubmit,
  isLoading,
  isEdit = false,
}: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { data: roles = [], isLoading: isLoadingRoles } = useRoles();
  const { register, handleSubmit, formState: { errors }, control } = form;
  const passwordValue = useWatch({ control, name: "password" });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/users"
          className="p-2 rounded-xl bg-card-bg border border-card-border text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEdit ? "Edit User" : "Create New User"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEdit
              ? "Update user details and roles"
              : "Add a new user to the system"}
          </p>
        </div>
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                {...register("firstName")}
                className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-xs text-danger">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                {...register("lastName")}
                className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-xs text-danger">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email <span className="text-danger">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-xs text-danger">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Password {isEdit ? "(Leave empty to keep current)" : <span className="text-danger">*</span>}
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2.5 pr-10 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                placeholder={isEdit ? "********" : "Enter password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Show live password strength indicator if typing a password, or if create mode and no password yet */}
            {(!isEdit || passwordValue) && (
              <PasswordStrengthIndicator password={passwordValue} />
            )}

            {errors.password && (
              <p className="text-xs text-danger">{errors.password.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Role <span className="text-danger">*</span>
              </label>
              <select
                {...register("roleId")}
                className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                disabled={isLoadingRoles}
              >
                <option value="">Select a role</option>
                {roles.map((role: { id: number; name: string }) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.roleId && (
                <p className="text-xs text-danger">{errors.roleId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Status <span className="text-danger">*</span>
              </label>
              <select
                {...register("status")}
                className="w-full px-4 py-2.5 bg-background border border-card-border rounded-xl text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
              >
                {USER_STATUS.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-xs text-danger">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-card-border flex justify-end gap-3">
            <Link href="/admin/users">
              <button
                type="button"
                className="px-6 py-2.5 text-sm font-medium text-foreground bg-surface-hover hover:bg-surface-hover/80 rounded-xl transition-all"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={16} />
              {isLoading ? "Saving..." : "Save User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
