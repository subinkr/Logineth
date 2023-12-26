import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqGithubRegister {
  @ApiProperty({ example: 'Github code string' })
  @IsNotEmpty()
  @IsString()
  code: string;
}
