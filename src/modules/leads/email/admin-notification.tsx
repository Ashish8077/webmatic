import React from "react";
import { BaseLayout } from "@/shared/services/email/templates/layouts/base-layout";
import { CreatedLead } from "../types/repository.types";

interface AdminNotificationEmailProps {
  lead: CreatedLead;
}

export function AdminNotificationEmail({ lead }: AdminNotificationEmailProps) {
  return (
    <BaseLayout title={`New Lead Submission: ${lead.name}`}>
      <p>A new lead has been submitted via the contact form.</p>
      
      <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "5px", border: "1px solid #ddd" }}>
        <p style={{ margin: "5px 0" }}><strong>Name:</strong> {lead.name}</p>
        <p style={{ margin: "5px 0" }}><strong>Email:</strong> {lead.email}</p>
        {lead.phone && <p style={{ margin: "5px 0" }}><strong>Phone:</strong> {lead.phone}</p>}
        {lead.company && <p style={{ margin: "5px 0" }}><strong>Company:</strong> {lead.company}</p>}
        
        <p style={{ margin: "15px 0 5px 0" }}><strong>Message:</strong></p>
        <div style={{ whiteSpace: "pre-wrap", background: "#fff", padding: "10px", border: "1px solid #eee" }}>
          {lead.message}
        </div>
      </div>
      
      <p style={{ marginTop: "20px" }}>
        <a href={`/admin/leads/${lead.id}`} style={{ display: "inline-block", background: "#0070f3", color: "#fff", padding: "10px 15px", textDecoration: "none", borderRadius: "5px" }}>
          View Lead in CMS
        </a>
      </p>
    </BaseLayout>
  );
}
