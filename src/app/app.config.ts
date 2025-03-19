import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { ProductEffect } from './modules/products/states/product.effects';
import { apiProductReducer } from './modules/products/states/product.reducer';
import { dbProductReducer } from './modules/products/states/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore(), 
    provideHttpClient(),

    // Products NgRx
    provideEffects(ProductEffect),
    provideState({name: 'api_product', reducer: apiProductReducer }),
    provideState({name: 'db_product', reducer: dbProductReducer }),
  ]
};
