"use client";

import { useState } from "react";
import { Menu } from "@/modules/menus/types/menu.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { showToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

interface MenuListProps {
  menus: Menu[];
}

export function MenuList({ menus }: MenuListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/admin/menus/${id}`);
      
      showToast("Menu deleted successfully", "success");
      router.refresh();
    } catch {
      showToast("Failed to delete menu. Ensure it has no items.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-card-border">
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Name</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Location</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Status</th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-b border-card-border/50 last:border-0 hover:bg-surface-hover/50 transition-colors">
                <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-foreground">{menu.name}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm text-muted-foreground capitalize">{menu.location}</td>
                <td className="px-5 py-4 whitespace-nowrap text-sm">
                  <Badge variant={menu.isActive ? "active" : "inactive"}>
                  {menu.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
                <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push(`/admin/menus/${menu.id}`)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Builder
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setDeletingId(menu.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
          {menus.length === 0 && (
            <tr>
              <td colSpan={4} className="px-5 py-4 text-center text-sm text-muted-foreground">
                No menus found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      <ConfirmDialog
        isOpen={deletingId !== null}
        title="Delete Menu"
        message="Are you sure you want to delete this menu? This cannot be undone."
        confirmText="Delete"
        onConfirm={() => deletingId && handleDelete(deletingId)}
        onClose={() => setDeletingId(null)}
      />
    </div>
  );
}
