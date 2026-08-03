"use client";

import { MenuItem } from "@/modules/menus/types/menu.types";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ChevronRight, ChevronLeft, Edit2, Trash2 } from "lucide-react";

interface MenuTreeProps {
  items: MenuItem[];
  onChange: (items: MenuItem[]) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
}

export function MenuTree({ items, onChange, onEdit, onDelete }: MenuTreeProps) {
  
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    onChange(newItems);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    onChange(newItems);
  };

  const indent = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const prevItem = newItems[index - 1];
    newItems[index] = { ...newItems[index], parentId: prevItem.id };
    onChange(newItems);
  };

  const outdent = (index: number) => {
    const item = items[index];
    if (!item.parentId) return;
    const newItems = [...items];
    // Simple outdent removes parent for now (brings to root)
    newItems[index] = { ...newItems[index], parentId: null };
    onChange(newItems);
  };

  const getDepth = (item: MenuItem): number => {
    let depth = 0;
    let curr = item.parentId;
    while(curr) {
      depth++;
      const parent = items.find(i => i.id === curr);
      curr = parent?.parentId || null;
    }
    return depth;
  };

  const renderItem = (item: MenuItem, index: number, depth: number) => {
    return (
      <div 
        key={item.id} 
        className="flex items-center justify-between p-3 border border-card-border rounded-lg mb-2 bg-surface hover:bg-surface-hover transition-colors"
        style={{ marginLeft: `${depth * 2}rem` }}
      >
        <div className="flex items-center gap-3">
          <span className="font-medium text-foreground">{item.title}</span>
          <span className="text-xs px-2 py-1 bg-card-bg border border-card-border rounded text-muted-foreground capitalize">
            {item.itemType}
          </span>
          {!item.isActive && (
            <span className="text-xs px-2 py-1 bg-danger/10 text-danger rounded border border-danger/20">Disabled</span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => outdent(index)} disabled={!item.parentId} title="Outdent">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => indent(index)} disabled={index === 0} title="Indent">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => moveUp(index)} disabled={index === 0} title="Move Up">
            <ArrowUp className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => moveDown(index)} disabled={index === items.length - 1} title="Move Down">
            <ArrowDown className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-card-border mx-2" />
          <Button variant="ghost" size="sm" onClick={() => onEdit(item)} title="Edit">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => onDelete(item.id)} title="Delete">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No menu items yet.</div>
      ) : (
        items.map((item, index) => renderItem(item, index, getDepth(item)))
      )}
    </div>
  );
}
