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

  @Get('')
  getUsers() {
    return this.userService.fetchUser();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Post('check-email')
  checkEmailUser(@Query('email') email: string) {
    return this.userService.checkEmailUser(email);
  }

  @Get(':id/:postId')
  getUserById(@Param('id') id: string, @Param('postId') postId: string) {
    if (!postId)
      throw new HttpException('postId not found', HttpStatus.BAD_REQUEST);
    return { id, postId };
  }
}
