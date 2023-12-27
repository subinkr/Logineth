import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqOAuthRegister {
  @ApiProperty({ example: ' token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
