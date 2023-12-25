import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ReqLocalRegister } from './dto/req-local-register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('local')
  async localRegister(@Body() reqLocalRegister: ReqLocalRegister) {}
}
