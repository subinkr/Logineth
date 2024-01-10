import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { AuthID } from 'src/common/auth/decorator/id.decorator';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { plainToInstance } from 'class-transformer';
import { ResFollowing } from './dto/res-following.dto';
import { ResUnFollowing } from './dto/res-un-following.dto';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('following/:targetUserID')
  @UseGuards(AuthGuard)
  async following(
    @Param('targetUserID', ParseIntPipe) targetUserID: number,
    @AuthID() loginUserID: number,
  ) {
    const result = await this.friendService.following(
      targetUserID,
      loginUserID,
    );
    return plainToInstance(ResFollowing, result);
  }

  @Delete('unFollowing/:targetUserID')
  @UseGuards(AuthGuard)
  async unFollowing(
    @Param('targetUserID', ParseIntPipe) targetUserID: number,
    @AuthID() loginUserID: number,
  ) {
    const result = await this.friendService.unFollowing(
      targetUserID,
      loginUserID,
    );
    return plainToInstance(ResUnFollowing, result);
  }
}
