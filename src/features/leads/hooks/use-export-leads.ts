import { useState } from "react";
import { exportLeads } from "../api/export-leads";
import { GetLeadsQuerySchemaData } from "@/modules/leads/validation/admin-lead.schema";
import { toast } from "sonner";

export function useExportLeads() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (params: Omit<GetLeadsQuerySchemaData, "page" | "limit">) => {
    setIsExporting(true);
    try {
      await exportLeads(params);
      toast.success("Export successful.");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export leads.");
    } finally {
      setIsExporting(false);
    }
  };

  return { exportLeads: handleExport, isExporting };
}
