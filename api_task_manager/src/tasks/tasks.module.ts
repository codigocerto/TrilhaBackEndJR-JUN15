import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { FindAllTasksService } from './services/find-all-tasks.service';
import { CreateNewTaskService } from './services/create-new-task.service';
import { UpdateTaskService } from './services/update-task.service';
import { DeleteTaskService } from './services/delete-task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './models/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { FindOneTaskService } from './services/find-one-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [
    FindAllTasksService,
    FindOneTaskService,
    CreateNewTaskService,
    UpdateTaskService,
    DeleteTaskService,
    JwtService,
  ],
})
export class TasksModule {}
