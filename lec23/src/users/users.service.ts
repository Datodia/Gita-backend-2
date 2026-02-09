import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create({ email, fullName }: CreateUserDto) {
    const existUser = await this.userRepo.findOneBy({ email });
    if (existUser) throw new BadRequestException('User already exists');

    const newUser = await this.userRepo.save({ fullName, email });

    return newUser;
  }

  findAll() {
    return this.userRepo.find({
      relations: ['posts'],
    });
  }

  async findOne(id: string) {
    const existUser = await this.userRepo.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!existUser) throw new BadRequestException('User not found');
    return existUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existUser = await this.userRepo.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!existUser) throw new BadRequestException('User not found');
    const updateUser = Object.assign(existUser, updateUserDto);
    await this.userRepo.save(updateUser);
    return updateUser;
  }

  async remove(id: string) {
    const existUser = await this.userRepo.findOne({ where: { id } });
    if (!existUser) throw new BadRequestException('User not found');
    await this.userRepo.remove(existUser);
    return existUser;
  }
}
