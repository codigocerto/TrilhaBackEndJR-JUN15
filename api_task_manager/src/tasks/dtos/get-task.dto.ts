import { IsString } from 'class-validator';

export class GetTaskDto {
  @IsString()
  readonly taskName: string;

  @IsString()
  readonly description: string;
}
