import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // LEARN: @nestjs/platform-express is supported out-of-the-box and used by default
  // If you want to access underlying platform-specific API of express change below to
  // ... = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // LEARN: start the listening for HTTP requests on the given port
}
bootstrap();
