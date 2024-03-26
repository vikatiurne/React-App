import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true, origin: true });
  try {
    await app.listen(3001);
    console.log('Сервер запущений на порту 3001');
    console.log('Підключення до бази даних успішне');
  } catch (error) {
    console.log('Помилка запуску сервера:', error);
  }
}
bootstrap();
