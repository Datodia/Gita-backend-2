import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  findAll( @Query() queryParams: PaginationDto ) {
    return this.usersService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param() {id}: IsValidObjectId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param() {id}: IsValidObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() {id}: IsValidObjectId) {
    return this.usersService.remove(id);
  }
}
