import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { FindAllTasksService } from './services/find-all-tasks.service';
import { CreateNewTaskService } from './services/create-new-task.service';
import { UpdateTaskService } from './services/update-task.service';
import { DeleteTaskService } from './services/delete-task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './models/task.entity';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController, AuthController],
  providers: [
    FindAllTasksService,
    CreateNewTaskService,
    UpdateTaskService,
    DeleteTaskService,
  ],
})
export class TasksModule {}
