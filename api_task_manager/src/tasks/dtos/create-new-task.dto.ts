import { IsString } from 'class-validator';

export class CreateNewTaskDto {
  @IsString()
  readonly taskName: string;

  @IsString()
  readonly description: string;
}
