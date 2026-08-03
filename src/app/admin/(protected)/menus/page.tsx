"use client";

import { MenuList } from "@/features/menus/components/menu-list";
import { useMenus } from "@/features/menus/hooks/use-menus";

export default function MenusPage() {
  const { data, isLoading } = useMenus();

  const menus = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground mt-3">Loading menus...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Menus</h1>
      </div>
      <MenuList menus={menus} />
    </div>
  );
}
