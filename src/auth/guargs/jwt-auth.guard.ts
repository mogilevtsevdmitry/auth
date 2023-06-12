import { isPublic } from '@common/decorators';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const _isPublic = isPublic(ctx, this.reflector);
        if (_isPublic) {
            return true;
        }
        return super.canActivate(ctx);
    }
}
