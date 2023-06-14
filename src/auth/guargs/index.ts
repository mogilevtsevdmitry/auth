import { GoogleAuthGuard } from './google.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';
import { YandexAuthGuard } from './yandex.guard';

export const GUARDS = [JwtAuthGuard, RolesGuard, GoogleAuthGuard, YandexAuthGuard];
