import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/source-code/entities/user.entity';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ResGetFollowingUsers {
  @ApiProperty({ example: MockUserModel.users })
  followingUsers: UserModel[];
}
