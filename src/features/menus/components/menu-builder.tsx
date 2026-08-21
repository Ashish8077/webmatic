"use client";

import { useState } from "react";
import { Menu, MenuItem } from "@/modules/menus/types/menu.types";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { MenuTree } from "./menu-tree";
import { showToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/ui/modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { MenuItemForm } from "./menu-item-form";
import { apiClient } from "@/lib/api";

interface MenuBuilderProps {
  menu: Menu;
  initialItems: MenuItem[];
}

function buildFlatTree(allItems: MenuItem[], parentId: number | null = null): MenuItem[] {
  const children = allItems
    .filter((i) => i.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  
  let result: MenuItem[] = [];
  for (const child of children) {
    result.push(child);
    result = result.concat(buildFlatTree(allItems, child.id));
  }
  return result;
}

export function MenuBuilder({ menu, initialItems }: MenuBuilderProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [items, setItems] = useState<MenuItem[]>(() => buildFlatTree(initialItems));
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [addingSubmenuTo, setAddingSubmenuTo] = useState<number | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [prevInitialItems, setPrevInitialItems] = useState(initialItems);

  if (initialItems !== prevInitialItems) {
    setPrevInitialItems(initialItems);
    setItems(buildFlatTree(initialItems));
  }

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
      queryClient.invalidateQueries({ queryKey: ["menus", menu.id] });
      queryClient.invalidateQueries({ queryKey: ["menu-items", menu.id] });
      router.refresh();
    } catch {
      showToast("Failed to save menu order", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await apiClient.delete(`/admin/menu-items/${itemToDelete}`);

      setItems(items.filter((i) => i.id !== itemToDelete && i.parentId !== itemToDelete));
      showToast("Item deleted", "success");
      queryClient.invalidateQueries({ queryKey: ["menus", menu.id] });
      queryClient.invalidateQueries({ queryKey: ["menu-items", menu.id] });
      router.refresh();
    } catch {
      showToast("Failed to delete item. It may have children.", "error");
    } finally {
      setItemToDelete(null);
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
          onDelete={setItemToDelete}
          onAddSubmenu={setAddingSubmenuTo}
        />
      </div>

      <Modal
        isOpen={isAddingItem || !!editingItem || !!addingSubmenuTo}
        onClose={() => {
          setIsAddingItem(false);
          setEditingItem(null);
          setAddingSubmenuTo(null);
        }}
        title={editingItem ? "Edit Item" : addingSubmenuTo ? "Add Submenu" : "Add Item"}
      >
        <MenuItemForm
          menuId={menu.id}
          initialData={editingItem || undefined}
          defaultParentId={addingSubmenuTo}
          onSuccess={() => {
            setIsAddingItem(false);
            setEditingItem(null);
            setAddingSubmenuTo(null);
            queryClient.invalidateQueries({ queryKey: ["menus", menu.id] });
            queryClient.invalidateQueries({ queryKey: ["menu-items", menu.id] });
            router.refresh();
          }}
          onCancel={() => {
            setIsAddingItem(false);
            setEditingItem(null);
            setAddingSubmenuTo(null);
          }}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Menu Item"
        message="Are you sure you want to delete this menu item? This action cannot be undone."
        confirmText="Delete Item"
        variant="danger"
      />
    </div>
  );
}
