import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import { YandexStrategy } from './yandex.strategy';

export const STRTAGIES = [JwtStrategy, GoogleStrategy, YandexStrategy];
