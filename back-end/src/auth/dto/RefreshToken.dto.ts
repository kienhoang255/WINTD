import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  access_token: string;

  @IsNotEmpty()
  fingerprint: string;
}
