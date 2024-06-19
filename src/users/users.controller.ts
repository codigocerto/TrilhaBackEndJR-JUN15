import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuards } from '../auth/guards/role-guard';
import { Roles } from '../auth/decorators/roles';
import { RoleEnum } from '../enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/file.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDoc } from './docs/create-user.doc';
import { UserCreatedResponseDoc } from './docs/create-response.doc';
import {
  ConflictUserResponseDoc,
  ErrorResponseFindByIdUserDoc,
} from '../tasks/docs/ErrorResponseDoc';
import { ResponseAllUserkDoc } from './docs/response-all.doc';
import { UpdateUserDoc } from './docs/update-user.doc';
import { ResponseUpdateUserDoc } from './docs/updated-doc';

@ApiTags('3 - Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDoc })
  @ApiCreatedResponse({ type: UserCreatedResponseDoc })
  @ApiConflictResponse({ type: ConflictUserResponseDoc })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: FileDTO) {
    return this.usersService.create(createUserDto, file);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [ResponseAllUserkDoc] })
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UserCreatedResponseDoc })
  @ApiNotFoundResponse({ type: ErrorResponseFindByIdUserDoc })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateUserDoc })
  @ApiNotFoundResponse({ type: ErrorResponseFindByIdUserDoc })
  @ApiOkResponse({ type: ResponseUpdateUserDoc })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'User successfully removed' })
  @ApiParam({ name: 'id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: UserCreatedResponseDoc })
  @UseGuards(AuthGuard)
  @Get('info/me')
  InfoUser(@CurrentUser() currentUser: User) {
    return this.usersService.GetInfoUsers(+currentUser.id);
  }
}
