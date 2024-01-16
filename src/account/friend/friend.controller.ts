import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { AuthID } from 'src/common/auth/decorator/id.decorator';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { plainToInstance } from 'class-transformer';
import { ResFollowing } from './dto/res-following.dto';
import { ResUnFollowing } from './dto/res-un-following.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { badRequest } from 'src/source-code/error/swagger/bad-request';
import { forbidden } from 'src/source-code/error/swagger/forbidden';
import { notFound } from 'src/source-code/error/swagger/not-found';
import { ResFindUsers } from './dto/res-find-users.dto';
import { ResFollowerUsers } from './dto/res-follower-users.dto';
import { ResFollowingUsers } from './dto/res-following-users.dto';

@Controller('')
@ApiTags('account | friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('follower')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Follower Users' })
  @ApiOkResponse({ type: ResFollowerUsers })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiBearerAuth()
  async followerUsers(
    @AuthID() loginUserID: number,
  ): Promise<ResFollowerUsers> {
    const result = await this.friendService.followerUsers(loginUserID);
    return plainToInstance(ResFollowerUsers, result);
  }

  @Get('following')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Following Users' })
  @ApiOkResponse({ type: ResFollowingUsers })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiBearerAuth()
  async followingUsers(
    @AuthID() loginUserID: number,
  ): Promise<ResFollowingUsers> {
    const result = await this.friendService.followingUsers(loginUserID);
    return plainToInstance(ResFollowingUsers, result);
  }

  @Post('following/:targetUserID')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Following' })
  @ApiNoContentResponse({ type: ResFollowing })
  @ApiBadRequestResponse(badRequest('이미 팔로우 중입니다.'))
  @ApiForbiddenResponse(forbidden('자기 자신을 팔로우 할 수 없습니다.'))
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiBearerAuth()
  async following(
    @Param('targetUserID', ParseIntPipe) targetUserID: number,
    @AuthID() loginUserID: number,
  ): Promise<ResFollowing> {
    const result = await this.friendService.following(
      targetUserID,
      loginUserID,
    );
    return plainToInstance(ResFollowing, result);
  }

  @Delete('unfollowing/:targetUserID')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'UnFollowing' })
  @ApiNoContentResponse({ type: ResFollowing })
  @ApiBadRequestResponse(badRequest('이미 언팔로우 했습니다.'))
  @ApiForbiddenResponse(forbidden('자기 자신을 언팔로우 할 수 없습니다.'))
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiBearerAuth()
  async unFollowing(
    @Param('targetUserID', ParseIntPipe) targetUserID: number,
    @AuthID() loginUserID: number,
  ): Promise<ResUnFollowing> {
    const result = await this.friendService.unFollowing(
      targetUserID,
      loginUserID,
    );
    return plainToInstance(ResUnFollowing, result);
  }

  @Get('friend/find/:page')
  @ApiOperation({ summary: 'Find Users' })
  @ApiOkResponse({ type: ResFindUsers })
  async findUsers(
    @Query('keyword') keyword: string,
    @Param('page', ParseIntPipe) page: number,
  ): Promise<ResFindUsers> {
    const result = await this.friendService.findUsers(keyword, page);
    return plainToInstance(ResFindUsers, result);
  }
}
