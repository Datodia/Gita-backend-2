import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDTO } from './dto/send-email.dto';
import { SendWelcomeTextToNEwUSerDto } from './dto/send-welcome-new-users.dto';
export declare class EmailSenderService {
    private emailService;
    constructor(emailService: MailerService);
    sendEmailToSomeone({ subject, text, to }: SendEmailDTO): Promise<void>;
    sendWelcomeTextToNewUser({ to }: SendWelcomeTextToNEwUSerDto): Promise<void>;
    sendWelcomeTextToNewUsersBCC(bcc: any): Promise<void>;
    sendOTPCode(to: any, otpCode: any): Promise<void>;
}
