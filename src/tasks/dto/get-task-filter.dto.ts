import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `Task status is invalid only ${Object.keys(
      TaskStatus,
    )} are accepted`,
  })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
