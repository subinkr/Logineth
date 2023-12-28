import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqOAuthLogin {
  @ApiProperty({ example: 'token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
