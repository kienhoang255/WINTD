import {
  Body,
  Controller,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { RefreshTokenDto } from './dto/RefreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signInDto: LoginDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('logout')
  async logout(@Query('fp') fp: string) {
    return await this.authService.logout(fp);
  }

  @Post('refresh-token')
  @UsePipes(new ValidationPipe())
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshTokenDto);
  }
}
