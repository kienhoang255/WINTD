import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: {
    email: string;
    password: string;
    fingerprint: string;
  }): Promise<any> {
    const checkFingerprint = await this.authRepository.findOneBy({
      fingerprint: data.fingerprint,
    });
    if (checkFingerprint) {
      throw new HttpException('You already login', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.findOneByEmail(data.email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const compare = await bcrypt.compare(data.password, user.password);
    if (!compare) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = await this.jwtService.signAsync({
      username: user.username,
    });
    await this.saveRefreshToken(user, data.fingerprint);

    return {
      message: 'Login successful',
      status: 'success',
      data: { access_token: accessToken },
    };
  }

  async saveRefreshToken(
    user: { username: string; id: number },
    fingerprint: string,
  ): Promise<any> {
    const refreshToken = await this.jwtService.signAsync(
      { username: user.username },
      {
        expiresIn: '10s',
        secret: process.env.REFRESH_TOKEN_KEY,
      },
    );

    await this.authRepository.save({
      id_user: user.id,
      refresh_token: refreshToken,
      fingerprint,
    });
  }

  async logout(fingerprint: string): Promise<any> {
    const logout = await this.authRepository.findOneBy({ fingerprint });
    if (!logout) {
      throw new HttpException('authentication', HttpStatus.UNAUTHORIZED);
    }

    await this.authRepository.delete({ fingerprint });

    return {
      message: 'logout successfully',
      status: 'success',
      data: logout,
    };
  }

  async refreshToken(data: {
    fingerprint: string;
    access_token: string;
  }): Promise<any> {
    // Validate fingerprint
    const token = await this.authRepository.findOneBy({
      fingerprint: data.fingerprint,
    });
    if (!token) {
      throw new HttpException('Invalid fingerprint', HttpStatus.UNAUTHORIZED);
    }

    // Verify access token
    try {
      await this.jwtService.verifyAsync(data.access_token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      throw new HttpException('Invalid access_token', HttpStatus.UNAUTHORIZED);
    }

    // Check refresh token expiration
    try {
      await this.jwtService.verifyAsync(token.refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new HttpException('refresh_token expired', HttpStatus.BAD_REQUEST);
    }

    // Generate new access token
    const accessToken = await this.jwtService.signAsync({
      username: '123',
    });

    return {
      message: 'Refresh token successful',
      status: 'success',
      data: { access_token: accessToken },
    };
  }
}
