import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqKakaoRegister {
  @ApiProperty({ example: 'Kakao code string' })
  @IsNotEmpty()
  @IsString()
  code: string;
}
