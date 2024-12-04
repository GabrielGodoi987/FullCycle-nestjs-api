import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AdminProductsService } from './admin-products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserRoles } from 'src/auth/roles/roles';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Roles(UserRoles.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly adminProductService: AdminProductsService) {}

  @Post()
  public create(@Body() createProductDto: CreateProductDto) {
    return this.adminProductService.create(createProductDto);
  }

  @Get()
  public findAll() {
    return this.adminProductService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.adminProductService.findOne(id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.adminProductService.update(id, updateProductDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.adminProductService.remove(id);
  }
}
