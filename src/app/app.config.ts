import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { ProductEffect } from './modules/products/states/product.effects';
import { productReducer } from './modules/products/states/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore(), 
    provideHttpClient(),

    // Products NgRx
    provideEffects(ProductEffect),
    provideState({name: 'product', reducer: productReducer }),
  ]
};
