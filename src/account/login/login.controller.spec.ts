import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { providers } from 'src/source-code/mock/providers/providers';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers,
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  // LLTEST: - usex, returnx
  describe('Local Login', () => {
    it.todo('Use | localLogin');

    it.todo('Return | ResLogin');
  });

  // OLTEST: - usex, returnx
  describe('OAuth Login', () => {
    it.todo('Use | oAuthLogin');

    it.todo('Return | ResLogin');
  });

  // LTEST: - usex, returnx
  describe('Logout', () => {
    it.todo('Use | logout');

    it.todo('Return | ResLogout');
  });
});
