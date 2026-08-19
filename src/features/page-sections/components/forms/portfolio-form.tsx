import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PortfolioContentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="bg-card-bg border border-card-border rounded-xl p-5 space-y-4">
        <h4 className="font-semibold text-foreground">Section Header</h4>
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Badge Text"
            placeholder="e.g., Featured Work"
            {...register("content.badge")}
          />
          <Input
            label="Heading"
            placeholder="e.g., Our Portfolio"
            {...register("content.heading")}
            error={(errors.content as Record<string, { message?: string }> | undefined)?.heading?.message}
          />
          <Input
            label="Highlight"
            placeholder="e.g., Highlighted Text"
            {...register("content.highlight")}
            error={(errors.content as Record<string, { message?: string }> | undefined)?.highlight?.message}
          />
          <Textarea
            label="Description"
            placeholder="Enter a brief description..."
            {...register("content.description")}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Note: Portfolio projects are managed automatically from the Work Projects module.
        </p>
      </div>
    </div>
  );
}

export function PortfolioSettingsForm() {
  return null;
}
