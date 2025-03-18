import { Routes } from '@angular/router';
import { ProductUnreviewedIndexComponent } from './modules/products/components/product-unreviewed-index/product-unreviewed-index.component';

export const routes: Routes = [

   { 
      path: '',
      pathMatch: 'full',
      redirectTo: 'login'
   },

   // { 
   //    path: 'empty',
   //    component: LayoutComponent,
   //    data: {
   //       layout: 'empty'
   //    }
   // },

   { 
      path: 'login',
      component: ProductUnreviewedIndexComponent,
      data: {
         layout: 'empty'
      }
   },

   // { 
   //    path: 'basic',
   //    component: LayoutComponent,
   //    data: {
   //       layout: 'basic'
   //    },
   //    children: [
   //       { 
   //           path: '', 
   //           loadChildren: () => import('app/modules/products/product.routes')
   //       },
   //   ]
   // },
];

