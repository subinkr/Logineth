import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from 'src/source-code/entities/user.entity';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ResRegister {
  @ApiProperty({ example: MockUserModel.accessToken, required: false })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({ example: MockUserModel.user, required: false })
  @IsNotEmpty()
  @IsInstance(UserModel)
  user: UserModel;
}
