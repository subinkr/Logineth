import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ReqEditUser {
  @ApiProperty({ example: MockUserModel.swaggerUser.image })
  @IsString()
  image: string;

  @ApiProperty({ example: MockUserModel.swaggerUser.nickname })
  @MinLength(1)
  @MaxLength(10)
  @IsString()
  nickname: string;

  @ApiProperty({ example: MockUserModel.swaggerUser.bio, required: false })
  @IsString()
  bio: string;
}
