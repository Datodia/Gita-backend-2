import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;

  const mockQuery: any = {};
  mockQuery.select = jest.fn().mockReturnValue(mockQuery);
  mockQuery.then = jest.fn();

  const userModel = {
    findOne: jest.fn().mockReturnValue(mockQuery),
    create: jest.fn(),
    findById: jest.fn(),
  };

  const jwtService = {
    sign: jest.fn(),
  };

  const userMock = {
    _id: '641199001122331123123123',
    email: 'test@example.com',
    fullName: 'Test User',
    age: 25,
    password: 'hashedpassword',
  };

  beforeEach(async () => {
    mockQuery.then.mockImplementation((resolve) => resolve(userMock));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('user'),
          useValue: userModel,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('should throw error when user already exists', async () => {
      const signUpDto = {
        email: 'test@example.com',
        fullName: 'Test User',
        age: 25,
        password: 'password123',
      };
      mockQuery.then.mockImplementation((resolve) => resolve(userMock));
      expect(async () => {
        await authService.signUp(signUpDto);
      }).rejects.toThrow(BadRequestException);
    });

    it('should create user when data is valid', async () => {
      const signUpDto = {
        email: 'new@example.com',
        fullName: 'New User',
        age: 30,
        password: 'password123',
      };
      mockQuery.then.mockImplementation((resolve) => resolve(null));
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      jest.spyOn(userModel, 'create').mockResolvedValue(userMock);
      const result = await authService.signUp(signUpDto);
      expect(result).toBe('User created successfully');
    });
  });

  describe('signIn', () => {
    it('should throw error when user not found', async () => {
      const signInDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };
      mockQuery.then.mockImplementation((resolve) => resolve(null));
      expect(async () => {
        await authService.signIn(signInDto);
      }).rejects.toThrow(BadRequestException);
    });

    it('should throw error when password is incorrect', async () => {
      const signInDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      mockQuery.then.mockImplementation((resolve) => resolve(userMock));
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      expect(async () => {
        await authService.signIn(signInDto);
      }).rejects.toThrow(BadRequestException);
    });

    it('should return token when credentials are valid', async () => {
      const signInDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      mockQuery.then.mockImplementation((resolve) => resolve(userMock));
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockedtoken');
      const result = await authService.signIn(signInDto);
      expect(result).toEqual({ token: 'mockedtoken' });
    });
  });

  describe('currentUser', () => {
    it('should return user when found', async () => {
      const userId = '641199001122331123123123';
      jest.spyOn(userModel, 'findById').mockResolvedValue(userMock);
      const result = await authService.currentUser(userId);
      expect(result).toBe(userMock);
    });
  });
});
