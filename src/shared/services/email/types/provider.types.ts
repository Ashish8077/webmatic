export interface EmailSendOptions {
  to: string | string[];
  from?: string;
  fromName?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailSendResult {
  messageId?: string;
  success: boolean;
  provider: string;
}

export interface IEmailProvider {
  send(options: EmailSendOptions): Promise<EmailSendResult>;
  healthCheck(): Promise<boolean>;
}
