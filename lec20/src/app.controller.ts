import { Body, Controller, DefaultValuePipe, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SendEmailDTO } from './email-sender/dto/send-email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('lang', new DefaultValuePipe('en')) lang: string): string {
    return this.appService.getHello(lang);
  }

  @Post('/send-email')
  sendEmailtoSomeone(@Body() sendEmailDto: SendEmailDTO){
    return this.appService.sendEmailtoSomeone(sendEmailDto)
  }
}
