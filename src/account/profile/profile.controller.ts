import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ResGetUserByUsername } from './dto/res-get-user-by-username.dto';
import { plainToInstance } from 'class-transformer';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { notFound } from 'src/source-code/error/swagger/not-found';

@Controller('profile')
@ApiTags('account/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiOkResponse({ type: ResGetUserByUsername })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<ResGetUserByUsername> {
    const result = await this.profileService.getUserByUsername(username);
    return plainToInstance(ResGetUserByUsername, result);
  }
}
