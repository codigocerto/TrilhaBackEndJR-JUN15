import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRES_IN'),
    },
  }),
};
