import { ArgumentsHost, BadGatewayException, Catch, ConflictException, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { throwError } from 'rxjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const { message } = exception;

        console.log({ message });

        const findText = (target: string) => {
            const matched = message.indexOf(target);
            const sliced = message.slice(matched);
            return matched === -1 ? 'Internal Server Error' : sliced;
        };

        const UNIQUE = findText('Unique constraint');
        // TODO добавить обработку остальных ошибок

        if (UNIQUE) {
            return throwError(() => new ConflictException(UNIQUE).getResponse());
        }

        throw new BadGatewayException(`Internal Server Error`);
    }
}
