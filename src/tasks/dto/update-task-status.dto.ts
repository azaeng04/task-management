import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: `Task status is invalid only ${Object.keys(
      TaskStatus,
    )} are accepted`,
  })
  status?: TaskStatus;
}
