import { Injectable } from '@nestjs/common';
import { CreateUserType } from './utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  fetchUser() {
    return;
  }

  createUser(data: CreateUserType) {
    const newUser = this.userRepository.create({ ...data });
    return this.userRepository.save(newUser);
  }

  checkEmailUser(data: string) {
    return data;
  }
}
