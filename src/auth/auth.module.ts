import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { options } from './config';
import { GUARDS } from './guargs';
import { STRTAGIES } from './strategies';
import { HttpModule } from '@nestjs/axios';

@Module({
    controllers: [AuthController],
    providers: [AuthService, ...STRTAGIES, ...GUARDS],
    imports: [PassportModule, JwtModule.registerAsync(options()), UserModule, HttpModule],
})
export class AuthModule {}
