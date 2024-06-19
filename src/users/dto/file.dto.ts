import {
  IsString,
  IsNotEmpty,
  IsMimeType,
  IsDefined,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
// Dto do arquivo que vai ser enviado, há verificação na service para garantir que seja imagem
export class FileDTO {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  fieldname: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  originalname: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsMimeType()
  mimetype: string;

  @IsDefined()
  buffer: Buffer;

  @IsDefined()
  size: number;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  images?: FileDTO[];
}
