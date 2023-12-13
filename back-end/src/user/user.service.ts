import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserType } from './utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUser() {
    return await this.userRepository.find();
  }

  async createUser(data: CreateUserType): Promise<any> {
    const user = await this.checkEmailUser(data.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    const newUser = this.userRepository.create({ ...data, password: hash });
    return await this.userRepository.save(newUser);
  }

  async checkEmailUser(data: string): Promise<any> {
    return await this.userRepository.findOneBy({ email: data });
  }

  async findOneByEmail(data: string): Promise<any> {
    const findUser = await this.userRepository.findOneBy({ email: data });
    return findUser;
  }
}
