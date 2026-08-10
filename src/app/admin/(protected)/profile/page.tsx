"use client";

import { ChangePasswordForm } from "@/features/auth/components/change-password-form";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account security settings.
        </p>
      </div>

      {/* Security Section */}
      <section>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
