import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ReqLocalLogin {
  @ApiProperty({ example: MockUserModel.user.username })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'p@ssw0rd' })
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password: string;
}
