import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class YandexAuthGuard extends AuthGuard('yandex') {}
