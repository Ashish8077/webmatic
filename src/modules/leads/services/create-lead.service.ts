import { CreateLeadInput, CreatedLead } from "../types/repository.types";
import { leadRepository } from "../repositories/lead.repository";
import { EmailService } from "@/shared/services/email/email.service";
import { AdminNotificationEmail } from "../email/admin-notification";
import { CustomerConfirmationEmail } from "../email/customer-confirmation";
import React from "react";
import { env } from "@/config/env.server";
import { logger } from "@/shared/utils/logger";

export async function createLeadService(
  input: CreateLeadInput
): Promise<void> {
  const createdLead = await leadRepository.create(input);

  // Dispatch emails asynchronously, await so serverless process doesn't die.
  // Failures in email won't throw upwards to break the HTTP 201 response.
  await Promise.allSettled([
    EmailService.sendTemplate({
      to: createdLead.email,
      subject: "We received your message",
      component: React.createElement(CustomerConfirmationEmail, { lead: createdLead }),
    }).catch(e => logger.error("Customer confirmation email failed", e)),

    EmailService.sendTemplate({
      to: env.ADMIN_EMAIL,
      subject: `New Lead Submission: ${createdLead.name}`,
      component: React.createElement(AdminNotificationEmail, { lead: createdLead }),
    }).catch(e => logger.error("Admin notification email failed", e)),
  ]);
}
