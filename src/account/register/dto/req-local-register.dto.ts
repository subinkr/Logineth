import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ReqLocalRegister {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsString()
  image?: string;
}
