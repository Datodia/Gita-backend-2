import { Injectable } from '@nestjs/common';
import { SendEmailDTO } from './email-sender/dto/send-email.dto';
import { EmailSenderService } from './email-sender/email-sender.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users/schema/users.schema';

@Injectable()
export class AppService {
  constructor(
    private emailSenderService: EmailSenderService,
    @InjectModel('user') private userModel: Model<User>,
  ){}

  private data = {
    en: {
      title: "Hello world"
    },
    ka: {
      title: 'გამარჯობა სამყარო'
    }
  }

  getHello(lang: string): string {
    return this.data[lang]?.title;
  }

  async sendEmailtoSomeone({subject, text}: SendEmailDTO){
    const emails = [
      'dato.diasamidze.02@gmail.com',
      'nika@gmail.com',
      'test@gmail.com',
      'lasha.2017.muzashvili@gmail.com',
      'lasha.2017.muzashvili1@gmail.com',
      'lasha.2017.muzashvil2i@gmail.com',
      'lasha.2017.muzashvili3@gmail.com',
      'lasha.2017.muzashvil4i@gmail.com',
      'lasha.2017.muzashvil5i@gmail.com',
      'lasha.2017.muzashvil6i@gmail.com',
      'lasha.2017.muzashvil7i@gmail.com',
      'lasha.2017.muzashvil8i@gmail.com',
      'lasha.2017.muzashvil9i@gmail.com',
      'lasha.2017.muzashvil9i@gmail.com',
      'lasha.2017.muzashvil11i@gmail.com',
      'lasha.2017.muzashvil911i@gmail.com',
      'lasha.2017.muzashvil911i@gmail.com',
      'lasha.2017.muzashvil911i@gmail.com',
      'lasha.2017.muzashvil119i@gmail.com',
      'lasha.2017.muzashvil119i@gmail.com',
      'lasha.2017.muzashvil119i@gmail.com',
      'lasha.2017.muzashvil11asd19i@gmail.com',
      'lasha.2017.muzashvil11asd19i@gmail.com',
      'lasha.2017.muzashvil11asd19i@gmail.com',
      'lasha.2017.muzashvil11asd19i@gmail.com',
      'lasha.2017.muzashvil1asd119i@gmail.com',
    ]
    // for(let email of emails){
    //   await this.emailSenderService.sendWelcomeTextToNewUser({to: email})
    // }
    await this.emailSenderService.sendWelcomeTextToNewUsersBCC(emails)
    // const promises = emails.map(e => this.emailSenderService.sendWelcomeTextToNewUser({to: e}))
    // await Promise.all(promises)
    return 'sent successfully'
  }
}
