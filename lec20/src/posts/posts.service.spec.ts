import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PostsService', () => {
  let postService: PostsService;

  const postModel = {
    findById: jest.fn(),
    create: jest.fn(),
    find: jest.fn()
  }

  const postMock = {
    _id: '641199001122331123123123',
    title: "test post",
    desc: "test desc",
    number: 1
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken('post'),
          useValue: postModel
        }
      ],
    }).compile();

    postService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  describe('get post by id', () => {
    it('it should throw error when wrong id provided', async () => {
      const invalidId = 'invalid'
      expect(async () => {
        await postService.findOne(invalidId)
      }).rejects.toThrow(BadRequestException)
    })

    it('should be thorw not found exeption when user not found', () => {
      const validId = postMock._id
      jest.spyOn(postModel, 'findById').mockResolvedValue(null)
      expect(async () => {
        await postService.findOne(validId)
      }).rejects.toThrow(NotFoundException)
    })

    it('should return post when everything is okay', async () => {
      jest.spyOn(postModel, 'findById').mockResolvedValue(postMock)
      const post = await postService.findOne(postMock._id)
      expect(post._id).toBe(postMock._id)
    })
  })

  describe('get all posts', () => {
    it('should return all posts when everything is okay', async () => {
      jest.spyOn(postModel, 'find').mockResolvedValue([postMock])
      const reslt = await postService.findAll()
      expect(reslt.length).toBe(1)
    })
  })

  describe('craete post', () => {
    it('should return post when correct data passed', async () => {
      const createPostDto = {
        title: "post 2",
        desc: "desc 2",
        number: 2
      }
      jest.spyOn(postModel, 'create').mockResolvedValue({
        _id: '123123123324411441144111',
        ...createPostDto
      })

      const result = await postService.create(createPostDto)
      expect(result.title).toBe(createPostDto.title)
    })
  })

});
