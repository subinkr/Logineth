import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  // LLTEST: - usex
  describe('Local Login', () => {
    it.todo('Use | getUserByUsername');

    it.todo('Use | verifyPassword');

    it.todo('Use | signToken');
  });

  //GGITEST: - returnx, errorx
  describe('Get Github Info', () => {
    it.todo('Return | {id: number, nickname: string, image: string}');

    it.todo('Error | Cannot get github info');
  });

  // GLTEST: - usex
  describe('Github Login', () => {
    it.todo('Use | getGithubInfo');

    it.todo('Use | githubRegister');

    it.todo('Use | signToken');
  });

  //GGITEST: - returnx, errorx
  describe('Get Google Info', () => {
    it.todo('Return | {id: number, nickname: string, image: string}');

    it.todo('Error | Cannot get google info');
  });

  // GLTEST: - usex
  describe('Google Login', () => {
    it.todo('Use | getGoogleInfo');

    it.todo('Use | googleRegister');

    it.todo('Use | signToken');
  });

  //GGITEST: - returnx, errorx
  describe('Get Kakao Info', () => {
    it.todo('Return | {id: number, nickname: string, image: string}');

    it.todo('Error | Cannot get kakao info');
  });

  // GLTEST: - usex
  describe('Kakao Login', () => {
    it.todo('Use | getKakaoInfo');

    it.todo('Use | kakaoRegister');

    it.todo('Use | signToken');
  });

  // GLTEST: - usex
  describe('Logout', () => {
    it.todo('Use | signToken');
  });
});
