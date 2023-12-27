import {
  Body,
  Controller,
  Delete,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { plainToInstance } from 'class-transformer';
import { ResRegister } from './dto/res-register.dto';
import {
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { notAcceptable } from 'src/source-code/error/swagger/not-acceptable';
import { notFound } from 'src/source-code/error/swagger/not-found';
import { ReqOAuthRegister } from './dto/req-oauth-register.dto';
import { Provider } from 'src/source-code/enum/provider';
import { ResWithdrawRegister } from './dto/res-withdraw-register.dto';
import { AuthUsername } from 'src/common/auth/decorator/username.decorator';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { unauthorized } from 'src/source-code/error/swagger/unauthorized';
import { forbidden } from 'src/source-code/error/swagger/forbidden';

@Controller('register')
@ApiTags('account | register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('local')
  @ApiOperation({ summary: 'Local register' })
  @ApiOkResponse({ type: ResRegister })
  @ApiNotFoundResponse(notFound('유저를 찾을 수 없습니다.'))
  @ApiNotAcceptableResponse(notAcceptable('이미 사용중인 아이디입니다.'))
  async localRegister(
    @Body() reqLocalRegister: ReqLocalRegister,
  ): Promise<ResRegister> {
    const result = await this.registerService.localRegister(reqLocalRegister);
    return plainToInstance(ResRegister, result);
  }

  @Post('oauth/:provider')
  @ApiOperation({ summary: 'OAuth register' })
  @ApiOkResponse({ type: ResRegister })
  @ApiNotAcceptableResponse(notAcceptable('유저 정보를 가져오지 못했습니다.'))
  async oAuthRegister(
    @Param('provider', new ParseEnumPipe(Provider)) provider: Provider,
    @Body() reqOAuthRegister: ReqOAuthRegister,
  ): Promise<ResRegister> {
    const result = await this.registerService.oAuthRegister(
      reqOAuthRegister,
      provider,
    );
    return plainToInstance(ResRegister, result);
  }

  @Delete('withdraw/:withdrawUsername')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Withdraw Register' })
  @ApiOkResponse({ type: ResWithdrawRegister })
  @ApiUnauthorizedResponse(unauthorized('로그인이 필요합니다.'))
  @ApiForbiddenResponse(forbidden('다른 유저를 탈퇴할 수 없습니다.'))
  async withdrawRegister(
    @Param('withdrawUsername') withdrawUsername: string,
    @AuthUsername() username: string,
  ): Promise<ResWithdrawRegister> {
    const result = await this.registerService.withdrawRegister(
      withdrawUsername,
      username,
    );

    return plainToInstance(ResWithdrawRegister, result);
  }
}
