import { JwtPayload } from '@auth/interfaces';
import { CurrentUser } from '@common/decorators';
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserResponse } from './responses';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':idOrEmail')
    async findOneUser(@Param('idOrEmail') idOrEmail: string) {
        const user = await this.userService.findOne(idOrEmail);
        return new UserResponse(user);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
        return this.userService.delete(id, user);
    }

    @Get()
    me(@CurrentUser() user: JwtPayload) {
        return user;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Put()
    async updateUser(@Body() body: Partial<User>) {
        const user = await this.userService.save(body);
        return new UserResponse(user);
    }
}
