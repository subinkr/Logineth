import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqOAuthRegister {
  @ApiProperty({ example: 'Github: code | Google: access_token | Kakao: code' })
  @IsNotEmpty()
  @IsString()
  code: string;
}
