import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ReqEditRow {
  @ApiProperty({ example: 'Edit content' })
  @MinLength(1)
  @IsString()
  content: string;
}
