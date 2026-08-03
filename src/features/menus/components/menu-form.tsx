"use client";

import { useState } from "react";
import { Menu, MenuLocation } from "@/modules/menus/types/menu.types";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { showToast } from "@/components/ui/toast";

interface MenuFormProps {
  initialData?: Menu;
  onSuccess: () => void;
  onCancel: () => void;
}

export function MenuForm({ initialData, onSuccess, onCancel }: MenuFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    location: initialData?.location || "header",
    isActive: initialData?.isActive ?? true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = initialData ? `/admin/menus/${initialData.id}` : `/admin/menus`;
      if (initialData) {
        await apiClient.put(url, formData);
      } else {
        await apiClient.post(url, formData);
      }
      
      showToast(`Menu ${initialData ? "updated" : "created"} successfully`, "success");
      onSuccess();
    } catch (error) {
      showToast("An error occurred", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Name</label>
        <Input 
          required 
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Main Header Menu"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Slug</label>
        <Input 
          required 
          value={formData.slug}
          onChange={e => setFormData({ ...formData, slug: e.target.value })}
          placeholder="e.g. header"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Location</label>
        <Select
          value={formData.location}
          onChange={e => setFormData({ ...formData, location: e.target.value as MenuLocation })}
          options={[
            { label: "Header", value: "header" },
            { label: "Footer", value: "footer" },
          ]}
        />
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="menuIsActive"
          checked={formData.isActive}
          onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
        />
        <label htmlFor="menuIsActive" className="text-sm font-medium text-foreground">Active</label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>Save Menu</Button>
      </div>
    </form>
  );
}
