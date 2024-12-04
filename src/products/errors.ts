export class ProductSlugAlreadyExistsError extends Error {
  constructor(slug: string) {
    super(`Product with ${slug} already exists`);
    this.name = 'productSlugAlreadyExistsError';
  }
}
