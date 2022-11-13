import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: `Task status is invalid only ${Object.keys(
      TaskStatus,
    )} are accepted`,
  })
  status?: TaskStatus;
}
