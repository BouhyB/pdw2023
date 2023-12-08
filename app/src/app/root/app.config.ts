import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import { routes } from '../../app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import {HttpInterceptor} from '@api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([HttpInterceptor])
    )
  ]
};
