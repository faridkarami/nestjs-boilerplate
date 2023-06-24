import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import deepMapObject from './deep-map-object';

import { TranslatorResponseSerializer } from './shared.response.serializer';
import userResponseSerializer from 'src/domains/domain-auth/users/user.response.serializer';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        return deepMapObject(data, (value) => {
          const lang = context.switchToHttp().getRequest().headers[
            this.configService.get('app.headerLanguage')
          ];

          const translatorResponseSerializer =
            new TranslatorResponseSerializer();
          translatorResponseSerializer.run(lang, value);

          // delete value.createdAt;
          // delete value.updatedAt;
          delete value.deletedAt;
          return value;
        });
      }),
    );
  }
}
