import { SetMetadata, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const PUBLIC_KEY = 'public';
export const Public = () => SetMetadata(PUBLIC_KEY, true);

export const isPublic = (ctx: ExecutionContext, reflector: Reflector) => {
    const isPublic = reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [ctx.getHandler(), ctx.getClass()]);
    return isPublic;
};
