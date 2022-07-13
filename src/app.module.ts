import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
import { getConfig } from 'src/common/utils/yaml';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true, // 忽略 .env 文件
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
