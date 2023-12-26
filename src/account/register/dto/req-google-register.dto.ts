import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqGoogleRegister {
  @ApiProperty({ example: 'Google access token string' })
  @IsNotEmpty()
  @IsString()
  googleToken: string;
}
