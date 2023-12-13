import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.findUser();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userData: CreateUserDto) {
    return await this.userService.createUser(userData);
  }

  @Post('check-email')
  async checkEmailUser(@Query('email') email: string) {
    return await this.userService.checkEmailUser(email);
  }

  @Get(':id/:postId')
  async getUserById(@Param('id') id: string, @Param('postId') postId: string) {
    if (!postId)
      throw new HttpException('postId not found', HttpStatus.BAD_REQUEST);
    return await { id, postId };
  }
}
