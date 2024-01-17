import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as UUID } from 'uuid';
import { ResPagination } from './dto/res-pagination.dto';
import { ResUploadImageToS3 } from './dto/res-upload-image-to-s3.dto';
import { ProfileService } from 'src/account/profile/profile.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/source-code/entities/user.entity';
import { Repository } from 'typeorm';
import { ReqLanguage } from './dto/req-language.dto';
import { ResLanguage } from './dto/res-language.dto';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
    private readonly profileService: ProfileService,
  ) {}

  async uploadImageToS3(
    file: Express.Multer.File,
  ): Promise<ResUploadImageToS3> {
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    file.originalname = `${UUID()}.${
      file.originalname.split('.').slice(-1)[0]
    }`;

    const bucket = new AWS.S3();

    const params = {
      ACL: 'public-read',
      Body: file.buffer,
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file.originalname,
    };

    return this.runBucket(bucket, params, file);
  }

  async runBucket(bucket: any, params: any, file: Express.Multer.File) {
    const callback = () => ({
      image: `https://${process.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/${file.originalname}`,
    });

    return bucket.putObject(params).promise().then(callback);
  }

  async language(
    loginUserID: number,
    reqLanguage: ReqLanguage,
  ): Promise<ResLanguage> {
    const { language } = reqLanguage;
    const { user: loginUser } =
      await this.profileService.getUserByID(loginUserID);
    const user = await this.userRepo.save({ ...loginUser, language });

    return { user };
  }

  pagination<T>(
    findAndCount: [T[], number],
    take: number,
    skip: number,
    page: number,
  ): ResPagination<T> {
    const array = findAndCount[0];
    const arrayCount = findAndCount[1];
    const nextPage = skip + take < arrayCount && page + 1;

    return { array, arrayCount, nextPage };
  }
}
