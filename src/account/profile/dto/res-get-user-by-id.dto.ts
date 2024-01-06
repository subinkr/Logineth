import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNotEmpty } from 'class-validator';
import { UserModel } from 'src/source-code/entities/user.entity';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ResGetUserByID {
  @ApiProperty({ example: MockUserModel.swaggerUser })
  @IsNotEmpty()
  @IsInstance(UserModel)
  user: UserModel;
}
