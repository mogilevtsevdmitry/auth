import { RolesGuard } from '@auth/guargs/role.guard';
import { JwtPayload } from '@auth/interfaces';
import { CurrentUser, Roles } from '@common/decorators';
import {
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Role } from '@prisma/client';
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

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    me(@CurrentUser() user: JwtPayload) {
        return user;
    }
}
