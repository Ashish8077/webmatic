import React from "react";
import { BaseLayout } from "@/shared/services/email/templates/layouts/base-layout";
import { CreatedLead } from "../types/repository.types";

interface CustomerConfirmationEmailProps {
  lead: CreatedLead;
}

export function CustomerConfirmationEmail({ lead }: CustomerConfirmationEmailProps) {
  return (
    <BaseLayout title="We received your message">
      <p>Hi {lead.name},</p>
      <p>Thank you for reaching out. We have received your message and one of our team members will get back to you shortly.</p>
      
      <p>For your records, here is a copy of your message:</p>
      
      <blockquote style={{ background: "#f9f9f9", padding: "15px", borderLeft: "4px solid #ddd", margin: "10px 0", fontStyle: "italic" }}>
        {lead.message}
      </blockquote>
      
      <p>Best regards,<br />The Team</p>
    </BaseLayout>
  );
}
