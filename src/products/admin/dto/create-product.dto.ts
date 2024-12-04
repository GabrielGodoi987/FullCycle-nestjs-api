import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug can only contains lowercase letters, numbers and dashes',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @MaxLength(500)
  @IsString()
  description: string;

  @Min(1)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;
}
