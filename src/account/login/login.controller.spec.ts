import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  // LLTEST: - usex, returnx
  describe('Local Login', () => {
    it.todo('Use | localLogin');

    it.todo('Return | ResLogin');
  });

  // GLTEST: - usex, returnx
  describe('Github Login', () => {
    it.todo('Use | githubLogin');

    it.todo('Return | ResLogin');
  });

  // GLTEST: - usex, returnx
  describe('Google Login', () => {
    it.todo('Use | googleLogin');

    it.todo('Return | ResLogin');
  });

  // KLTEST: - usex, returnx
  describe('Kakao Login', () => {
    it.todo('Use | kakaoLogin');

    it.todo('Return | ResLogin');
  });

  // LTEST: - usex, returnx
  describe('Logout', () => {
    it.todo('Use | logout');

    it.todo('Return | ResLogout');
  });
});
