import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ResGetUser } from './dto/res-get-user.dto';
import { plainToInstance } from 'class-transformer';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { notFound } from 'src/source-code/error/swagger/not-found';
import { ReqEditUser } from './dto/req-edit-user.dto';
import { ResEditUser } from './dto/res-edit-user.dto';
import { AuthID } from 'src/common/auth/decorator/id.decorator';
import { forbidden } from 'src/source-code/error/swagger/forbidden';
import { AuthGuard } from 'src/common/auth/auth.guard';

@Controller('profile')
@ApiTags('account | profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get User By ID' })
  @ApiOkResponse({ type: ResGetUser })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  async getUserByID(
    @Param('id', ParseIntPipe) targetUserID: number,
  ): Promise<ResGetUser> {
    const result = await this.profileService.getUserByID(targetUserID);
    return plainToInstance(ResGetUser, result);
  }

  @Put(':id/edit')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Edit User' })
  @ApiOkResponse({ type: ResEditUser })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiForbiddenResponse(forbidden('다른 유저를 수정할 수 없습니다.'))
  @ApiBearerAuth()
  async editUser(
    @Param('id', ParseIntPipe) targetUserID: number,
    @Body() reqEditUser: ReqEditUser,
    @AuthID() loginUserID: number,
  ): Promise<ResEditUser> {
    const result = await this.profileService.editUser(
      targetUserID,
      reqEditUser,
      loginUserID,
    );
    return plainToInstance(ResEditUser, result);
  }
}
