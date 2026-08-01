import nodemailer from "nodemailer";
import { env } from "@/config/env.server";
import { EmailSendOptions, EmailSendResult, IEmailProvider } from "../types/provider.types";
import { logger } from "@/shared/utils/logger";

export class SMTPProvider implements IEmailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      requireTLS: env.SMTP_PORT !== 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
      // Pool is omitted because Next.js App Router typically runs in serverless environments 
      // where long-lived connection pools can cause function hanging or offer little benefit.
    });
  }

  async send(options: EmailSendOptions): Promise<EmailSendResult> {
    try {
      const fromAddress = options.from || env.SMTP_FROM;
      const fromName = options.fromName || env.EMAIL_FROM_NAME;
      
      const info = await this.transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        to: options.to,
        replyTo: options.replyTo || env.EMAIL_REPLY_TO,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      return {
        success: true,
        messageId: info.messageId,
        provider: "smtp",
      };
    } catch (error) {
      logger.error("SMTP provider failed to send email", { error });
      throw error; // Let the caller decide on retry strategy or silent failure
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      logger.error("SMTP health check failed", { error });
      return false;
    }
  }
}
