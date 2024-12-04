import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(
    private prismaService: PrismaService,
    private productService: ProductsService,
  ) {}
  async onModuleInit() {
    const products = new Array(10).fill(0).map((_, index) => index + 1);

    // used only in development mode
    await this.prismaService.product.deleteMany();

    for (const producIndex of products) {
      await this.productService.create({
        name: `Product ${producIndex}`,
        slug: `Product-${producIndex}`,
        description: `description of product ${producIndex}`,
        price: producIndex * 100,
      });
    }
  }
}
