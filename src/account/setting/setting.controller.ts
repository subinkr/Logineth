import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { AuthID } from 'src/common/auth/decorator/id.decorator';
import { ReqSetting } from './dto/req-setting.dto';
import { ResSetting } from './dto/res-setting.dto';
import { plainToInstance } from 'class-transformer';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { notFound } from 'src/source-code/error/swagger/not-found';

@ApiTags('account | setting')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post(':option')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Setting Option' })
  @ApiOkResponse({ type: ResSetting })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiBearerAuth()
  async setting(
    @AuthID() loginUserID: number,
    @Body() reqSetting: ReqSetting,
    @Param('option') option: string,
  ): Promise<ResSetting> {
    const result = await this.settingService.setting(
      loginUserID,
      reqSetting,
      option,
    );
    return plainToInstance(ResSetting, result);
  }
}
