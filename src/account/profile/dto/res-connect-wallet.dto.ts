import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResConnectWallet {
  @ApiProperty({ example: '연결되었습니다.' })
  @IsString()
  message: string;
}
