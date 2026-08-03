import { apiClient } from "@/lib/api";
import { LEADS_ENDPOINTS } from "../constants/endpoints";
import { GetLeadsQuerySchemaData } from "@/modules/leads/validation/admin-lead.schema";

export async function exportLeads(params: Omit<GetLeadsQuerySchemaData, "page" | "limit">): Promise<void> {
  const response = await apiClient.get(
    LEADS_ENDPOINTS.EXPORT_LEADS,
    { 
      params,
      responseType: 'blob' // Important for file download
    }
  );
  
  // Extract filename from Content-Disposition header if possible, else default
  let filename = "leads-export.csv";
  const disposition = response.headers['content-disposition'];
  if (disposition && disposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) { 
        filename = matches[1].replace(/['"]/g, '');
      }
  }

  // Create blob link to download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}
