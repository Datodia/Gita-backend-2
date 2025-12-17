import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from 'src/guards/is-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiBadRequestResponse({
    example: {
      message: 'User already exists',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiCreatedResponse({ example: 'User created successfully' })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @ApiBadRequestResponse({
    example: {
      message: 'Invalid Credentials',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiCreatedResponse({
    example: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTQyZDc2YTFkYjBiZjhhM2QxM2I5ZWEiLCJpYXQiOjE3NjU5ODg1MjcsImV4cCI6MTc2NTk5MjEyN30.KVpRTK-O2Laawhwt-TSMoWJzXR-kw0CPkRTC8jOW6u4',
    },
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    example: {
      message: 'permition denied',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiOkResponse({
    example: {
      _id: '6942d76a1db0bf8a3d13b9ea',
      fullName: 'John Doe',
      email: 'John@gmail.com',
      age: 22,
      expenses: [],
      role: 'viewer',
      createdAt: '2025-12-17T16:16:42.566Z',
      updatedAt: '2025-12-17T16:16:42.566Z',
      __v: 0,
    },
  })
  currentUser(@UserId() userId) {
    return this.authService.currentUser(userId);
  }
}
