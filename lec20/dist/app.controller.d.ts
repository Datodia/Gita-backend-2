import { AppService } from './app.service';
import { SendEmailDTO } from './email-sender/dto/send-email.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(lang: string): string;
    sendEmailtoSomeone(sendEmailDto: SendEmailDTO): Promise<string>;
}
