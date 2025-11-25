import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { authInterceptorFn } from '../../../app-login/src/lib/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(),
  provideHttpClient(withFetch(), withInterceptors([authInterceptorFn])),
  importProvidersFrom(IonicModule.forRoot({ mode: 'md' }))
  ],
};
