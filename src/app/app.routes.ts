import { Routes } from '@angular/router';
import {AllProductComponent} from "./all-product/all-product.component";

export const routes: Routes = [
    {
       path : '',
        redirectTo : 'all-product',
        pathMatch: 'full'
    },
    {
        path: 'all-product',
       component: AllProductComponent,
        pathMatch: 'full'
    },


];
