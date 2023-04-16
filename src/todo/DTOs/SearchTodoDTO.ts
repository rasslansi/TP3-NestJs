import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatusEnum } from '../TodoStatusEnum';

export class searchTodoDTO {
  @IsOptional()
  critere: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  statut: TodoStatusEnum;
}
