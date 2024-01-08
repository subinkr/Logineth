import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ReqEditUser {
  @ApiProperty({ example: MockUserModel.swaggerUser.image })
  @IsString()
  image: string;

  @ApiProperty({ example: MockUserModel.swaggerUser.nickname })
  @IsString()
  nickname: string;

  @ApiProperty({ example: MockUserModel.swaggerUser.bio, required: false })
  @IsString()
  bio: string;
}
