import { IEmailProvider, EmailSendOptions, EmailSendResult } from "./types/provider.types";
import { SMTPProvider } from "./providers/smtp.provider";
import { renderEmail } from "./renderer/render-email";
import React from "react";
import { logger } from "@/shared/utils/logger";

export interface SendTemplateOptions {
  component: React.ReactElement;
  to: string | string[];
  subject: string;
  from?: string;
  fromName?: string;
  replyTo?: string;
}

class EmailServiceImpl {
  private provider: IEmailProvider;

  constructor(provider: IEmailProvider) {
    this.provider = provider;
  }

  /**
   * Sends a raw email using the underlying provider.
   */
  async send(options: EmailSendOptions): Promise<EmailSendResult> {
    const startTime = Date.now();
    try {
      const result = await this.provider.send(options);
      logger.info("Email sent successfully", {
        provider: result.provider,
        durationMs: Date.now() - startTime,
      });
      return result;
    } catch (error) {
      logger.error("Failed to send email", {
        durationMs: Date.now() - startTime,
        error,
      });
      throw error;
    }
  }

  /**
   * Renders a React component to HTML and Plain Text, then sends it.
   * Uses dynamic import for react-dom/server to avoid Next.js bundler conflicts.
   */
  async sendTemplate(options: SendTemplateOptions): Promise<EmailSendResult> {
    const { component, ...rest } = options;

    // Dynamic import keeps react-dom/server out of the static bundle graph
    const ReactDOMServer = await import("react-dom/server");
    const rawHtml = ReactDOMServer.renderToStaticMarkup(component);
    const { html, text } = renderEmail(rawHtml);

    return this.send({
      ...rest,
      html,
      text,
    });
  }

  async healthCheck(): Promise<boolean> {
    return this.provider.healthCheck();
  }
}

// Export a singleton instance using the default SMTP provider.
export const EmailService = new EmailServiceImpl(new SMTPProvider());
