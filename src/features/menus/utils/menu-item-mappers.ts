import { MenuItem, MenuItemType, MenuTargetType } from "@/modules/menus/types/menu.types";
import { DestinationType, MenuItemFormValues } from "../schemas/menu-item-form.schema";
import { CreateMenuItemDTO } from "@/modules/menus/schemas/create-menu-item.schema";

export function toMenuItemFormValues(
  apiData?: MenuItem,
  defaultParentId: number | null = null
): MenuItemFormValues {
  if (!apiData) {
    return {
      title: "",
      destinationType: "page",
      destinationId: null,
      destinationUrl: "",
      parentId: defaultParentId,
      isActive: true,
    };
  }

  // Deduce combined Destination Type
  let destinationType: DestinationType = "page"; // Default fallback
  
  if (apiData.itemType === "link") {
    if (["page", "service", "external"].includes(apiData.targetType as string)) {
      destinationType = apiData.targetType as DestinationType;
    }
  } else {
    // If it's not a link, the itemType is the destinationType
    if (["group", "separator", "heading"].includes(apiData.itemType)) {
      destinationType = apiData.itemType as DestinationType;
    }
  }

  return {
    title: apiData.title,
    destinationType,
    destinationId: apiData.referenceId || null,
    destinationUrl: apiData.url || "",
    parentId: apiData.parentId || defaultParentId,
    isActive: apiData.isActive,
  };
}

export function toCreateMenuItemPayload(
  menuId: number,
  formData: MenuItemFormValues
): CreateMenuItemDTO {
  let itemType: MenuItemType = "link";
  let targetType: MenuTargetType | null = null;
  let referenceId: number | null = null;
  let url: string | null = null;

  if (["page", "service", "external"].includes(formData.destinationType)) {
    itemType = "link";
    targetType = formData.destinationType as MenuTargetType;
    if (targetType === "page" || targetType === "service") {
      referenceId = formData.destinationId || null;
    } else if (targetType === "external") {
      url = formData.destinationUrl || null;
    }
  } else {
    itemType = formData.destinationType as MenuItemType;
  }

  return {
    menuId,
    title: formData.title,
    itemType,
    targetType: targetType || undefined,
    referenceId: referenceId || undefined,
    url: url || undefined,
    parentId: formData.parentId || undefined,
    isActive: formData.isActive,
  };
}
