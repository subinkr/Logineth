import { ApiProperty } from '@nestjs/swagger';
import { IsInstance } from 'class-validator';
import { UserModel } from 'src/source-code/entities/user.entity';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ResLanguage {
  @ApiProperty({ example: MockUserModel.user })
  @IsInstance(UserModel)
  user: UserModel;
}
