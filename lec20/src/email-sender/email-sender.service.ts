import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDTO } from './dto/send-email.dto';
import { from } from 'rxjs';
import { SendWelcomeTextToNEwUSerDto } from './dto/send-welcome-new-users.dto';

@Injectable()
export class EmailSenderService {
  constructor(private emailService: MailerService) {}

  async sendEmailToSomeone({ subject, text, to }: SendEmailDTO) {
    const options = {
      to,
      from: 'GITA-BACK <ketigelovani@gmail.com>',
      subject,
      text,
    };

    await this.emailService.sendMail(options);
    console.log('Email sent successfully');
  }

  async sendWelcomeTextToNewUser({ to }: SendWelcomeTextToNEwUSerDto) {
    const options = {
      to,
      subject: 'Welcome',
      from: 'GITA-BACK <ketigelovani@gmail.com>',
      html: `<!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f6f7fb;">
            <div style="max-width:600px;margin:0 auto;padding:24px;">
            <div style="background:#ffffff;border:1px solid #e6e8ef;border-radius:8px;padding:24px;">
                <h2 style="margin:0 0 12px 0;color:#111827;">Welcome!</h2>
                <p style="margin:0 0 16px 0;color:#374151;line-height:1.5;">
                Thanks for signing up. We’re happy to have you here.
                </p>
                <p style="margin:0 0 20px 0;color:#374151;line-height:1.5;">
                If you have any questions, just reply to this email.
                </p>

                <a href="https://example.com"
                style="display:inline-block;padding:12px 16px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:6px;">
                Get started
                </a>

                <p style="margin:24px 0 0 0;color:#6b7280;font-size:12px;line-height:1.4;">
                If the button doesn’t work, copy and paste this link:<br />
                https://example.com
                </p>
            </div>
            </div>
        </body>
        </html>`,
    };
    await this.emailService.sendMail(options);
  }

  async sendWelcomeTextToNewUsersBCC(bcc) {
    const options = {
      bcc,
      subject: 'Welcome',
      from: 'GITA-BACK <ketigelovani@gmail.com>',
      html: `<!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f6f7fb;">
            <div style="max-width:600px;margin:0 auto;padding:24px;">
            <div style="background:#ffffff;border:1px solid #e6e8ef;border-radius:8px;padding:24px;">
                <h2 style="margin:0 0 12px 0;color:#111827;">Welcome!</h2>
                <p style="margin:0 0 16px 0;color:#374151;line-height:1.5;">
                Thanks for signing up. We’re happy to have you here.
                </p>
                <p style="margin:0 0 20px 0;color:#374151;line-height:1.5;">
                If you have any questions, just reply to this email.
                </p>

                <a href="https://example.com"
                style="display:inline-block;padding:12px 16px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:6px;">
                Get started
                </a>

                <p style="margin:24px 0 0 0;color:#6b7280;font-size:12px;line-height:1.4;">
                If the button doesn’t work, copy and paste this link:<br />
                https://example.com
                </p>
            </div>
            </div>
        </body>
        </html>`,
    };
    await this.emailService.sendMail(options);
  }

  async sendOTPCode(to, otpCode) {
    const options = {
      to,
      subject: 'OTP Code',
      from: 'GITA-BACK <ketigelovani@gmail.com>',
      html: `<!doctype html>
<html>
  <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f6f7fb;">
    <div style="max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:#fff;border:1px solid #e6e8ef;border-radius:8px;padding:24px;">
        <h2 style="margin:0 0 12px 0;color:#111827;">Your verification code</h2>

        <p style="margin:0 0 16px 0;color:#374151;line-height:1.5;">
          Use this code to finish signing in. This code expires in 3 minutes.
        </p>

        <div style="text-align:center;margin:20px 0 24px 0;">
          <div style="display:inline-block;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:10px;padding:16px 22px;">
            <span style="font-size:28px;letter-spacing:8px;font-weight:700;color:#111827;">
              ${otpCode}
            </span>
          </div>
        </div>

        <p style="margin:0 0 12px 0;color:#374151;line-height:1.5;">
          If you didn’t request this, you can ignore this email.
        </p>
      </div>
    </div>
  </body>
</html>`,
    };

    await this.emailService.sendMail(options);
  }
}
