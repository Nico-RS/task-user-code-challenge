import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../../core/services/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserLoginDto,
} from '../../core/dtos/user.dto';
import { User } from '../../core/entities/user.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PAGINATION } from 'src/core/constants/constants';
import { PaginationResult } from 'src/core/interfaces/pagination-result.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  getAllUsers(
    @Query('page') page: number = PAGINATION.DEFAULT_PAGE,
    @Query('limit') limit: number = PAGINATION.DEFAULT_LIMIT,
  ): Promise<PaginationResult<User>> {
    return this.userService.getAllUsers(page, limit);
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: number): Promise<User> {
    return this.userService.getUserById(userId);
  }

  @Post()
  createUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Patch(':userId')
  updateUser(
    @Body() updateUserData: UpdateUserDto,
    @Param('userId') userId: number,
  ): Promise<Partial<User>> {
    return this.userService.updateUser(userId, updateUserData);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: number): Promise<boolean> {
    return this.userService.deleteUser(userId);
  }

  @Post('login')
  login(@Body() userData: UserLoginDto): Promise<{ token: string }> {
    return this.userService.login(userData);
  }
}
