"use client";

import { MenuBuilder } from "@/features/menus/components/menu-builder";
import { useMenu } from "@/features/menus/hooks/use-menu";
import { useParams, notFound } from "next/navigation";

export default function MenuBuilderPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError } = useMenu(id);

  if (isError) {
    notFound();
  }

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground mt-3">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <MenuBuilder menu={data.data.menu} initialItems={data.data.items} />
    </div>
  );
}
