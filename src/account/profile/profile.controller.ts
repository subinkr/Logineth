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
import { ResGetUserByID } from './dto/res-get-user-by-id.dto';
import { plainToInstance } from 'class-transformer';
import {
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
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: ResGetUserByID })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  async getUserByID(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResGetUserByID> {
    const result = await this.profileService.getUserByID(id);
    return plainToInstance(ResGetUserByID, result);
  }

  @Put(':id/edit')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Edit user' })
  @ApiOkResponse({ type: ResEditUser })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiForbiddenResponse(forbidden('다른 유저를 수정할 수 없습니다.'))
  async editUser(
    @Param('id', ParseIntPipe) targetId: number,
    @Body() reqEditUser: ReqEditUser,
    @AuthID() id: number,
  ): Promise<ResEditUser> {
    const result = await this.profileService.editUser(
      targetId,
      reqEditUser,
      id,
    );
    return plainToInstance(ResEditUser, result);
  }
}
