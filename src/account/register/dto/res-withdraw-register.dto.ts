import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResWithdrawRegister {
  @ApiProperty({ example: { message: '탈퇴했습니다.' } })
  @IsNotEmpty()
  @IsString()
  message: string;
}
