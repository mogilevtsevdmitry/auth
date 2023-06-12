import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
    imports: [CacheModule.register()],
})
export class UserModule {}
