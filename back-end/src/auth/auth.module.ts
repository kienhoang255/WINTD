import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Auth]),
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
