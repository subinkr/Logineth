import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ResLogout {
  @ApiProperty({ example: MockUserModel.accessToken })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
