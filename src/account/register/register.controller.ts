import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { plainToInstance } from 'class-transformer';
import { ResLocalRegister } from './dto/res-local-register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('register')
@ApiTags('account | register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('local')
  @ApiOperation({ summary: 'Local register' })
  async localRegister(@Body() reqLocalRegister: ReqLocalRegister) {
    const result = await this.registerService.localRegister(reqLocalRegister);
    return plainToInstance(ResLocalRegister, result);
  }
}
