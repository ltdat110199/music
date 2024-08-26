import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() data: Prisma.UserCreateInput) {
    return this.userService.createUser(data);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOneUser(@Param('id') id: number) {
    return this.userService.findOneUser(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: Prisma.UserUpdateInput) {
    return this.userService.updateUser(+id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(+id);
  }
}
