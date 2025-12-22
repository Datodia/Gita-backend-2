import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.usersService.uploadUserPhoto(file);
  }

  @Post('get-file')
  getFile(@Body('fileId') fileId: string) {
    return this.usersService.getFile(fileId);
  }

  @Post('upload-many')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMany(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.usersService.uploadMany(files)
  }

  @Delete('user-image')
  deleteImage(@Body('fileId') fileId: string) {
    return this.usersService.deleteFile(fileId);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    example: [
      {
        _id: '111111213123aaa',
        fullName: 'John Doe',
        email: 'john@gmail.com',
        age: 22,
        role: 'user',
        isMerried: true,
      },
    ],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    type: String,
    default: 1,
  })
  @ApiQuery({
    name: 'take',
    required: false,
    example: 30,
    type: String,
    default: 30,
  })
  findAll(@Query() queryParams: PaginationDto) {
    return this.usersService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param() { id }: IsValidObjectId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IsValidObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IsValidObjectId) {
    return this.usersService.remove(id);
  }
}
