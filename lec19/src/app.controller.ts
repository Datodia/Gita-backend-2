import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

// app.use('/users', userRouter)
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  // /api
  @Get()
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }

  // // /api/users
  // // app.get('/users', (req, res) => {})
  // @Get('/users')
  // getAllUsers(){
  //   return this.appService.getAllUsers()
  // }


  // @Get('/posts')
  // test(){
  //   return 'posts info'
  // }
}

