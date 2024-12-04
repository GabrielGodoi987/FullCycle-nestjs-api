import { Module, OnModuleInit } from '@nestjs/common';
import { AdminProductsService } from './admin/admin-products.service';
import { AdminProductsController } from './admin/admin-products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsController } from './public/products.controller';
import { ProductsService } from './public/products.service';

@Module({
  controllers: [AdminProductsController, ProductsController],
  providers: [AdminProductsService, ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(
    private prismaService: PrismaService,
    private adminProductService: AdminProductsService,
  ) {}
  async onModuleInit() {
    const products = new Array(10).fill(0).map((_, index) => index + 1);

    // used only in development mode
    await this.prismaService.product.deleteMany();

    for (const producIndex of products) {
      await this.adminProductService.create({
        name: `Product ${producIndex}`,
        slug: `product-${producIndex}`,
        description: `description of product ${producIndex}`,
        price: producIndex * 100,
      });
    }
  }
}
