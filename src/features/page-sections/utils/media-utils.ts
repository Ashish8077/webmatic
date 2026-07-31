import type { JsonObject, JsonArray, JsonValue } from "@/shared/types/json";

/**
 * Standardizes the CMS media field naming convention.
 * Converts fields like `imageId` to `image`, `backgroundImageId` to `backgroundImage`, etc.
 */
export function getMediaFieldName(idFieldName: string): string {
  return idFieldName.replace(/Id$/, "");
}

/**
 * Hydrates media relations from the raw API payload into the parsed business data.
 * 
 * Rules:
 * 1. Walks recursively over JsonObjects and JsonArrays.
 * 2. Does NOT traverse Dates, Files, classes, or unknown object types.
 * 3. Never mutates the original `parsed` or `raw` inputs.
 * 4. Only creates new object branches when a relation actually attaches.
 * 5. Uses getMediaFieldName to match the property (e.g. `imageId` -> `image`).
 */
export function hydrateMediaRelations<T>(raw: JsonObject, parsed: T): T {
  // If parsed is null/undefined or not an object, just return it
  if (!parsed || typeof parsed !== "object") {
    return parsed;
  }

  // Handle arrays
  if (Array.isArray(parsed)) {
    const rawArray = Array.isArray(raw) ? raw : [];
    let hasChanges = false;
    
    const newArray = parsed.map((item, index) => {
      const rawItem = (rawArray[index] && typeof rawArray[index] === "object" ? rawArray[index] : {}) as JsonObject;
      const hydratedItem = hydrateMediaRelations(rawItem, item);
      if (hydratedItem !== item) {
        hasChanges = true;
      }
      return hydratedItem;
    });

    return (hasChanges ? newArray : parsed) as unknown as T;
  }

  // To prevent traversing non-plain objects like Dates or Files
  if (parsed.constructor !== Object) {
    return parsed;
  }

  const rawObj = (raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {}) as JsonObject;
  let hasChanges = false;
  
  // Start with a shallow copy if we need to make changes, but we'll optimize by only doing it when necessary
  let result: Record<string, any> = parsed;

  for (const key of Object.keys(parsed as Record<string, any>)) {
    const parsedValue = (parsed as Record<string, any>)[key];

    // If it's a media ID key (ends with Id), look for the corresponding media object in raw
    if (typeof key === "string" && key.endsWith("Id")) {
      const mediaKey = getMediaFieldName(key);
      // Only attach if raw actually contains the object, and parsed DOES NOT already have it
      // (We never overwrite existing values in parsed)
      if (!(mediaKey in (parsed as Record<string, any>)) && mediaKey in rawObj) {
        const rawMediaObj = rawObj[mediaKey];
        if (rawMediaObj && typeof rawMediaObj === "object") {
          if (!hasChanges) {
            result = { ...parsed };
            hasChanges = true;
          }
          result[mediaKey] = rawMediaObj;
        }
      }
    }

    // Recurse into nested objects/arrays
    if (parsedValue && typeof parsedValue === "object") {
      // Check if we have a corresponding raw object to hydrate from
      const nextRaw = (rawObj[key] && typeof rawObj[key] === "object" ? rawObj[key] : {}) as JsonObject;
      const hydratedValue = hydrateMediaRelations(nextRaw, parsedValue);
      
      if (hydratedValue !== parsedValue) {
        if (!hasChanges) {
          result = { ...parsed };
          hasChanges = true;
        }
        result[key] = hydratedValue;
      }
    }
  }

  return (hasChanges ? result : parsed) as T;
}
