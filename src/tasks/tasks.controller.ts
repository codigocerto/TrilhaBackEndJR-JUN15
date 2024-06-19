import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuards } from '../auth/guards/role-guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles';
import { RoleEnum } from '../enums/role.enum';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDoc } from './docs/create-task.doc';
import { CreatedResponseDoc } from './docs/created-response.doc';
import {
  ErrorResponseDoc,
  ErrorResponseFindByIdDoc,
} from './docs/ErrorResponseDoc';
import { ResponseAllTaskDoc } from './docs/all-tasks.doc';
import { ResponseUpdateTasksDoc } from './docs/updated-task.doc';
import { UpdateTaskDoc } from './docs/update-task.doc';

@ApiTags('2 - Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateTaskDoc })
  @ApiBadRequestResponse({ type: ErrorResponseDoc })
  @ApiResponse({ status: HttpStatus.OK, type: CreatedResponseDoc })
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.tasksService.create(createTaskDto, +currentUser.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ResponseAllTaskDoc, isArray: true })
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: CreateTaskDoc })
  @ApiNotFoundResponse({ type: ErrorResponseFindByIdDoc })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateTaskDoc })
  @ApiOkResponse({ type: ResponseUpdateTasksDoc })
  @ApiNotFoundResponse({ type: ErrorResponseFindByIdDoc })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @ApiOkResponse({ description: 'Task successfully removed' })
  @ApiParam({ name: 'id' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
