import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';

// serviço voltado para consultas, de maneira pública
// aqui podemos ter consultas personalizadas, com foco na qualidade de pesquisa do usuário
@Injectable()
export class ProductsService {
  private entity = 'product';
  constructor(private readonly prismaService: PrismaService) {}

  findAll(dto: { name?: string; page?: number; limit?: number }) {
    const { name, page = 1, limit = 15 } = dto;
    return this.prismaService.product.findMany({
      ...(name && {
        where: {
          name: {
            contains: name,
          },
        },
      }),
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(slug: string) {
    const product = await this.prismaService.product.findFirst({
      where: {
        slug,
      },
    });

    if (!product) {
      throw new NotFoundError(this.entity, slug, 'slug');
    }

    return product;
  }
}
