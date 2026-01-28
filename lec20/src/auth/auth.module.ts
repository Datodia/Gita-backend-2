import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/users/schema/users.schema';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN,
    }),
    EmailSenderModule,
    MongooseModule.forFeature([{ name: 'user', schema: userModel }]),
    PassportModule.register({defaultStrategy: 'google'})
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
