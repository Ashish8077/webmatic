import { Button } from "@/components/ui/button";
import { PermissionGate } from "@/features/auth/components/permission-gate";
import { Permission } from "@/features/auth/constants/permissions";
import Link from "next/link";
import { Plus } from "lucide-react";

function PageListHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your website pages
        </p>
      </div>
      <PermissionGate permission={Permission.PAGE_CREATE}>
        <Link href="/admin/pages/create">
          <Button size="md">
            <Plus />
            Create Page
          </Button>
        </Link>
      </PermissionGate>
    </div>
  );
}

export default PageListHeader;
