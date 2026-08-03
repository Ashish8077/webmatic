"use client";

import { useState } from "react";
import { MenuItem, MenuItemType, MenuTargetType } from "@/modules/menus/types/menu.types";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { showToast } from "@/components/ui/toast";

interface MenuItemFormProps {
  menuId: number;
  initialData?: MenuItem;
  onSuccess: () => void;
  onCancel: () => void;
}

export function MenuItemForm({ menuId, initialData, onSuccess, onCancel }: MenuItemFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    itemType: initialData?.itemType || "link",
    targetType: initialData?.targetType || "",
    referenceId: initialData?.referenceId || "",
    url: initialData?.url || "",
    isActive: initialData?.isActive ?? true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload: Record<string, unknown> = {
        menuId,
        title: formData.title,
        itemType: formData.itemType,
        isActive: formData.isActive,
      };

      if (formData.itemType === "link") {
        if (formData.targetType) payload.targetType = formData.targetType;
        if (formData.referenceId) payload.referenceId = Number(formData.referenceId);
        if (formData.url) payload.url = formData.url;
      }

      const url = initialData ? `/admin/menu-items/${initialData.id}` : `/admin/menu-items`;
      if (initialData) {
        await apiClient.put(url, payload);
      } else {
        await apiClient.post(url, payload);
      }
      
      showToast(`Item ${initialData ? "updated" : "created"} successfully`, "success");
      onSuccess();
    } catch {
      showToast("An error occurred", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Title</label>
        <Input 
          required 
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Item Type</label>
        <Select
          value={formData.itemType}
          onChange={e => setFormData({ ...formData, itemType: e.target.value as MenuItemType })}
          options={[
            { label: "Link", value: "link" },
            { label: "Group", value: "group" },
            { label: "Separator", value: "separator" },
            { label: "Heading", value: "heading" },
          ]}
        />
      </div>

      {formData.itemType === "link" && (
        <>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Target Type</label>
            <Select
              value={formData.targetType}
              onChange={e => setFormData({ ...formData, targetType: e.target.value as MenuTargetType })}
              options={[
                { label: "Select Target Type", value: "" },
                { label: "Page", value: "page" },
                { label: "Service", value: "service" },
                { label: "Blog Category", value: "blog_category" },
                { label: "External URL", value: "external" },
                { label: "Custom", value: "custom" },
              ]}
            />
          </div>

          {(formData.targetType === "page" || formData.targetType === "service" || formData.targetType === "blog_category") && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Reference ID</label>
              <Input 
                type="number" 
                required 
                value={formData.referenceId}
                onChange={e => setFormData({ ...formData, referenceId: e.target.value })}
                placeholder={`Enter ${formData.targetType} ID`}
              />
            </div>
          )}

          {(formData.targetType === "external" || formData.targetType === "custom") && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">URL</label>
              <Input 
                required 
                value={formData.url}
                onChange={e => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://"
              />
            </div>
          )}
        </>
      )}

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="isActive"
          checked={formData.isActive}
          onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
        />
        <label htmlFor="isActive" className="text-sm font-medium text-foreground">Active</label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>Save Item</Button>
      </div>
    </form>
  );
}
