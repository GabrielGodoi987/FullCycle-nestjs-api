import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductQueryDto } from './dto/product.query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  public findAll(@Query() queryDto: ProductQueryDto) {
    return this.productService.findAll(queryDto);
  }

  @Get(':slug')
  public findOne(@Param('slug') slug: string) {
    return this.productService.findOne(slug);
  }
}

//SOLID
// S -> single responsability
