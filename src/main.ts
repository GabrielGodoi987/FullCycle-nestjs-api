import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSlugAlreadyExistsErrorFilter } from './products/filters/product-slug-already-exists.filter';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './common/filters/not-found-error.filter';
import { InvalidCredentialsErrorFilter } from './auth/filters/invalid-credentials-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new ProductSlugAlreadyExistsErrorFilter(),
    new NotFoundErrorFilter(),
    new InvalidCredentialsErrorFilter()
  );
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
