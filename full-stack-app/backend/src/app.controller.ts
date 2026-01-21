import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getAllUsers(){
    return this.appService.getAllUsers()
  }

  @Post('users')
  createUser(@Body() craeteUserDto){
    return this.appService.createUser(craeteUserDto)
  }
}
