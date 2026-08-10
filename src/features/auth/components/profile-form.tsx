"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useProfile, useUpdateProfile } from "../hooks/use-profile";
import { profileFormSchema, ProfileFormValues } from "../schemas/profile-form.schema";
import { MediaField } from "@/features/media/components/media-field/media-field";

export function ProfileForm() {
  const { data: profile, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      profileImageId: null,
      profileImage: null,
    },
  });

  // Populate form when profile data loads
  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName ?? "",
        profileImageId: profile.profileImage?.id ?? null,
        profileImage: profile.profileImage ?? null,
      });
    }
  }, [profile, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfileMutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName ?? "",
        profileImageId: values.profileImageId ?? null,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while updating profile",
      );
    }
  };

  if (isLoading) {
    return <div className="animate-pulse h-64 bg-muted/20 rounded-md"></div>;
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Profile Information</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Update your name and profile picture.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Controller
            name="profileImage"
            control={form.control}
            render={({ field }) => (
              <div>
                <MediaField
                  label="Profile Image"
                  value={field.value}
                  onMediaChange={(media) => {
                    field.onChange(media);
                    form.setValue("profileImageId", media?.id ?? null, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    });
                  }}
                />
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Your avatar (square aspect ratio recommended).
                </p>
                {form.formState.errors.profileImageId && (
                  <p className="mt-1.5 text-sm font-medium text-danger">
                    {form.formState.errors.profileImageId.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="First Name"
              placeholder="John"
              {...form.register("firstName")}
              error={form.formState.errors.firstName?.message}
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              {...form.register("lastName")}
              error={form.formState.errors.lastName?.message}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={!form.formState.isDirty}
            isLoading={updateProfileMutation.isPending}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
