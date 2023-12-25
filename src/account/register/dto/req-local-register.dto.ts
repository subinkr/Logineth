import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ReqLocalRegister {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty({ example: 'p@ssw0rd' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'nickname' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ example: null })
  @IsString()
  image?: string;
}
