import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expenses } from './schema/expense.schema';
import { User } from '../users/schema/users.schema';
import { UsersService } from '../users/users.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('ExpensesService', () => {
  let service: ExpensesService;

  const mockExpenseModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const mockUserModel = {
    findByIdAndUpdate: jest.fn(),
  };

  const mockUsersService = {
    // Mock methods if needed
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: getModelToken('expense'),
          useValue: mockExpenseModel,
        },
        {
          provide: getModelToken('user'),
          useValue: mockUserModel,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllExpenses', () => {
    it('should return all expenses with populated user', async () => {
      const mockExpenses = [
        { _id: '1', amount: 100, category: 'food', user: { _id: 'user1' } },
        { _id: '2', amount: 200, category: 'transport', user: { _id: 'user2' } },
      ];
      const mockQuery = {
        populate: jest.fn().mockResolvedValue(mockExpenses),
      };
      jest.spyOn(mockExpenseModel, 'find').mockReturnValue(mockQuery as any);

      const result = await service.getAllExpenses({ page: 1, take: 10 });

      expect(mockExpenseModel.find).toHaveBeenCalled();
      expect(mockQuery.populate).toHaveBeenCalledWith({ path: 'user', select: '-expenses' });
      expect(result).toEqual(mockExpenses);
    });
  });

  describe('getExpenseById', () => {
    it('should return expense by id with populated user', async () => {
      const mockExpense = { _id: '1', amount: 100, category: 'food', user: { _id: 'user1' } };
      const mockQuery = {
        populate: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue(mockExpense),
        }),
      };
      jest.spyOn(mockExpenseModel, 'findById').mockReturnValue(mockQuery as any);

      const result = await service.getExpenseById('1');

      expect(mockExpenseModel.findById).toHaveBeenCalledWith('1');
      expect(mockQuery.populate).toHaveBeenCalledWith('user');
      expect(result).toEqual(mockExpense);
    });

    it('should throw NotFoundException if expense not found', async () => {
      const mockQuery = {
        populate: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue(null),
        }),
      };
      jest.spyOn(mockExpenseModel, 'findById').mockReturnValue(mockQuery as any);

      await expect(service.getExpenseById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createExpense', () => {
    it('should create a new expense and update user', async () => {
      const mockExpense = { _id: '1', amount: 100, category: 'food', user: 'user1' };
      const createDto = { amount: 100, category: 'food' };
      const userId = 'user1';

      jest.spyOn(mockExpenseModel, 'create').mockResolvedValue(mockExpense as any);
      jest.spyOn(mockUserModel, 'findByIdAndUpdate').mockResolvedValue({} as any);

      const result = await service.createExpense(createDto, userId);

      expect(mockExpenseModel.create).toHaveBeenCalledWith({
        amount: 100,
        category: 'food',
        user: userId,
      });
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        { $push: { expenses: mockExpense._id } },
        { new: true },
      );
      expect(result).toEqual(mockExpense);
    });
  });

  describe('deleteExpenseById', () => {
    it('should delete expense if user matches', async () => {
      const expenseId = '1';
      const userId = 'user1';
      const mockExpense = { _id: '1', user: userId };

      jest.spyOn(mockExpenseModel, 'findById').mockResolvedValueOnce(mockExpense as any);
      jest.spyOn(mockExpenseModel, 'findByIdAndDelete').mockResolvedValue(mockExpense as any);
      jest.spyOn(mockUserModel, 'findByIdAndUpdate').mockResolvedValue({} as any);

      const result = await service.deleteExpenseById(expenseId, userId);

      expect(mockExpenseModel.findById).toHaveBeenCalledWith(expenseId);
      expect(mockExpenseModel.findByIdAndDelete).toHaveBeenCalledWith(expenseId);
      expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(userId, {
        $pull: { expenses: mockExpense._id },
      });
      expect(result).toBe('deleted successfully');
    });

    it('should throw NotFoundException if expense not found', async () => {
      jest.spyOn(mockExpenseModel, 'findById').mockResolvedValue(null);

      await expect(service.deleteExpenseById('1', 'user1')).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if user does not match', async () => {
      const mockExpense = { _id: '1', user: 'user2' };
      jest.spyOn(mockExpenseModel, 'findById').mockResolvedValue(mockExpense as any);

      await expect(service.deleteExpenseById('1', 'user1')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if delete fails', async () => {
      const mockExpense = { _id: '1', user: 'user1' };
      jest.spyOn(mockExpenseModel, 'findById').mockResolvedValue(mockExpense as any);
      jest.spyOn(mockExpenseModel, 'findByIdAndDelete').mockResolvedValue(null);

      await expect(service.deleteExpenseById('1', 'user1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteAllExpesesByUserId', () => {
    it('should be defined', () => {
      // Since the method is empty, just check it exists
      expect(service.deleteAllExpesesByUserId).toBeDefined();
    });
  });
});