import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { RegisterService } from '../register/register.service';
import { providers } from 'src/source-code/mock/providers/providers';

describe('LoginService', () => {
  let service: LoginService;
  let registerService: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<LoginService>(LoginService);
    registerService = module.get<RegisterService>(RegisterService);
  });

  // LLTEST: - usex
  describe('Local Login', () => {
    it.todo('Use | getUserByUsername');

    it.todo('Use | verifyPassword');

    it.todo('Use | signToken');
  });

  // OLTEST: - usex
  describe('OAuth Login', () => {
    it.todo('Use | oAuthRegister');
  });

  // GLTEST: - usex
  describe('Logout', () => {
    it.todo('Use | signToken');
  });
});
