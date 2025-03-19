import { Routes } from '@angular/router';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
   { 
      path: '',
      pathMatch: 'full',
      redirectTo: 'app'
   },
   { 
      path: 'app',
      component: BasicLayoutComponent,
      children: [
         { 
               path: '', 
               loadChildren: () => import('./modules/products/product.routes')
         },
      ]
   },
   { 
      path: 'app/home',
      component: BasicLayoutComponent,
      children: [
         { 
               path: '', 
               component: HomeComponent,
         },
      ]
   },

];

