import { SendEmailDTO } from './email-sender/dto/send-email.dto';
import { EmailSenderService } from './email-sender/email-sender.service';
import { Model } from 'mongoose';
import { User } from './users/schema/users.schema';
export declare class AppService {
    private emailSenderService;
    private userModel;
    constructor(emailSenderService: EmailSenderService, userModel: Model<User>);
    private data;
    getHello(lang: string): string;
    sendEmailtoSomeone({ subject, text }: SendEmailDTO): Promise<string>;
}
