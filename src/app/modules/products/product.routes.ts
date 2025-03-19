import { Routes } from "@angular/router";
import { ProductUnreviewedIndexComponent } from "./components/product-unreviewed-index/product-unreviewed-index.component";
import { ProductReviewedIndexComponent } from "./components/product-reviewed-index/product-reviewed-index.component";

export default [
    { 
        path     : 'reviewed',     
        component: ProductReviewedIndexComponent 
    },
    { 
        path     : 'unreviewed',     
        component: ProductUnreviewedIndexComponent 
    },

] as Routes;