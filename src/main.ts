import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { BaseExceptionFilter } from './common/exceptions/filters/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/filters/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  // 注意先后顺序
  app.useGlobalFilters(new BaseExceptionFilter(), new HttpExceptionFilter());

  // HRM 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  await app.listen(3000);
}

bootstrap();
