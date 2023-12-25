import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from 'src/source-code/entities/user.entity';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ResLogin {
  @ApiProperty({ example: MockUserModel.accessToken })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({ example: MockUserModel.user })
  @IsNotEmpty()
  @IsInstance(UserModel)
  user: UserModel;
}
