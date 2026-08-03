"use client";

import { useState } from "react";
import { Menu, MenuItem } from "@/modules/menus/types/menu.types";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { MenuTree } from "./menu-tree";
import { showToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { MenuItemForm } from "./menu-item-form";
import { apiClient } from "@/lib/api";

interface MenuBuilderProps {
  menu: Menu;
  initialItems: MenuItem[];
}

export function MenuBuilder({ menu, initialItems }: MenuBuilderProps) {
  const router = useRouter();
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const handleSaveTree = async () => {
    setIsSaving(true);
    try {
      const payload = items.map((item, index) => ({
        id: item.id,
        parentId: item.parentId,
        sortOrder: index,
      }));

      await apiClient.post(`/admin/menu-items/reorder`, { menuId: menu.id, items: payload });

      showToast("Menu order saved successfully", "success");
      setHasChanges(false);
      router.refresh();
    } catch (error) {
      showToast("Failed to save menu order", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await apiClient.delete(`/admin/menu-items/${id}`);

      setItems(items.filter((i) => i.id !== id && i.parentId !== id));
      showToast("Item deleted", "success");
      router.refresh();
    } catch (error) {
      showToast("Failed to delete item. It may have children.", "error");
    }
  };

  const handleReorder = (newItems: MenuItem[]) => {
    setItems(newItems);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-foreground">
            {menu.name} Items
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Use arrows to reorder items.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddingItem(true)} variant="secondary">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
          <Button onClick={handleSaveTree} disabled={!hasChanges || isSaving}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="bg-card-bg border border-card-border rounded-2xl p-6">
        <MenuTree
          items={items}
          onChange={handleReorder}
          onEdit={setEditingItem}
          onDelete={handleDeleteItem}
        />
      </div>

      <Modal
        isOpen={isAddingItem || !!editingItem}
        onClose={() => {
          setIsAddingItem(false);
          setEditingItem(null);
        }}
        title={editingItem ? "Edit Item" : "Add Item"}
      >
        <MenuItemForm
          menuId={menu.id}
          initialData={editingItem || undefined}
          onSuccess={() => {
            setIsAddingItem(false);
            setEditingItem(null);
            router.refresh();
          }}
          onCancel={() => {
            setIsAddingItem(false);
            setEditingItem(null);
          }}
        />
      </Modal>
    </div>
  );
}
