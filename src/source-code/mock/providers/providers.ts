import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfileService } from 'src/account/profile/profile.service';
import { UserModel } from 'src/source-code/entities/user.entity';
import { MockUserModel } from '../entities/user.mock';

export const providers = [
  ProfileService,
  {
    provide: getRepositoryToken(UserModel),
    useClass: MockUserModel,
  },
];
