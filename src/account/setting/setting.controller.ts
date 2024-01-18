import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { AuthID } from 'src/common/auth/decorator/id.decorator';
import { ReqLanguage } from './dto/req-language.dto';
import { ResLanguage } from './dto/res-language.dto';
import { plainToInstance } from 'class-transformer';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { notFound } from 'src/source-code/error/swagger/not-found';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post('language')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Upload Image To S3' })
  @ApiOkResponse({ type: ResLanguage })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiBearerAuth()
  async language(
    @AuthID() loginUserID: number,
    @Body() reqLanguage: ReqLanguage,
  ): Promise<ResLanguage> {
    const result = await this.settingService.language(loginUserID, reqLanguage);
    return plainToInstance(ResLanguage, result);
  }
}
