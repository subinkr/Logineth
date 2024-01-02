import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ReqLocalRegister {
  @ApiProperty({ example: MockUserModel.swaggerUser.username })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty({ example: 'p@ssw0rd' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: MockUserModel.swaggerUser.nickname })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ example: MockUserModel.swaggerUser.nickname, required: false })
  @IsString()
  image?: string;
}
