import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // Habilita httpClient en toda la aplicación
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), provideAnimationsAsync()
  ]
};

