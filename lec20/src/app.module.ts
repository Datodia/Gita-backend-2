import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';
import { GetUserAgentMiddleware } from './middlewares/get-user-agent.middlewate';
import { IsAdminMiddleware } from './middlewares/is-admin.middleware';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { EmailSenderModule } from './email-sender/email-sender.module';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      }
    }),
    ExpensesModule, 
    UsersModule, 
    PostsModule, 
    AuthModule, 
    AwsS3Module, 
    EmailSenderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(GetUserAgentMiddleware)
    //   .forRoutes({path: '/expenses', method: RequestMethod.ALL})

    // consumer
    //   .apply(IsAdminMiddleware(['editor']))
    //   .forRoutes({path: '/users/*', method: RequestMethod.DELETE})
  }
}
