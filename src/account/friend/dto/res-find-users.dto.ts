import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/source-code/entities/user.entity';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ResFindUsers {
  @ApiProperty({ example: MockUserModel.users })
  findUsers: UserModel[];

  @ApiProperty({ example: 3 })
  findUsersLength: number;

  @ApiProperty({ example: false })
  nextPage: number | boolean;
}
