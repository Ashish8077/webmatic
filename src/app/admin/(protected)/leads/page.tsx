"use client";

import { useState } from "react";
import { LeadsHeader } from "@/features/leads/components/leads-header";
import { LeadsFilters } from "@/features/leads/components/leads-filters";
import { LeadsTable } from "@/features/leads/components/leads-table";
import { LeadDetailDrawer } from "@/features/leads/components/lead-detail-drawer";
import { useLeads } from "@/features/leads/hooks/use-leads";
import { useLeadsFilters } from "@/features/leads/hooks/use-leads-filters";
import { LeadListItem } from "@/modules/leads/types/lead.types";

export default function LeadsListPage() {
  const { query, updateFilters } = useLeadsFilters();
  const { data: response, isLoading } = useLeads(query);
  
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);

  const leads = response?.data?.items ?? [];
  const totalPages = response?.data?.totalPages ?? 1;
  const currentPage = response?.data?.page ?? 1;

  const handlePageChange = (page: number) => {
    updateFilters({ page });
  };

  const handleViewLead = (lead: LeadListItem) => {
    setSelectedLeadId(lead.id);
  };

  return (
    <div className="animate-fade-in">
      <LeadsHeader title="Lead Management" />
      
      <LeadsFilters />

      <LeadsTable 
        leads={leads} 
        isLoading={isLoading} 
        onViewLead={handleViewLead}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <LeadDetailDrawer 
        leadId={selectedLeadId} 
        onClose={() => setSelectedLeadId(null)} 
      />
    </div>
  );
}
