"use client";

import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { ProfileForm } from "@/features/auth/components/profile-form";
import { useProfile } from "@/features/auth/hooks/use-profile";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ProfilePage() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted/20 rounded-md"></div>;
  }

  if (!profile) {
    return null; // Or an error state
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="flex items-center gap-6">
        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-background shadow-md bg-muted flex items-center justify-center relative">
          {profile.profileImage?.url ? (
            <Image
              src={profile.profileImage.url}
              alt="Avatar"
              fill
              className="object-cover"
              unoptimized={profile.profileImage.url.startsWith("/")}
            />
          ) : (
            <span className="text-3xl font-semibold text-muted-foreground">
              {profile.firstName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {profile.firstName} {profile.lastName || ""}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-muted-foreground">{profile.email}</span>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {profile.roleSlug ? profile.roleSlug.replace("-", " ") : "User"}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                profile.status === "active"
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning"
              }`}
            >
              {profile.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Information Section */}
          <ProfileForm />

          {/* Security Section */}
          <ChangePasswordForm />
        </div>

        <div className="space-y-8">
          {/* Account Details Section (Read-only) */}
          <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Account Details</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Read-only information about your account.
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Email Address"
                value={profile.email}
                readOnly
                disabled
              />
              <Input
                label="Role"
                value={profile.roleSlug || "None"}
                readOnly
                disabled
              />
              <Input
                label="Account Status"
                value={profile.status}
                readOnly
                disabled
              />
              <Input
                label="Member Since"
                value={new Date(profile.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                readOnly
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
