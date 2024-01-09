import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResUploadImageToS3 {
  @ApiProperty({
    example: 'https://logineth.s3.ap-northeast-2.amazonaws.com/example.jpg',
  })
  @IsString()
  image: string;
}
