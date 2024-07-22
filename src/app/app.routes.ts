import {Routes} from '@angular/router';
import {AllProductComponent} from "./all-product/all-product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ErrorMsgComponent} from "./error-msg/error-msg.component";
import {CartComponent} from "./cart/cart.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'all-product',
        pathMatch: 'full'
    },
    {
        path: 'all-product',
        component: AllProductComponent,
        pathMatch: 'full'
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '**',
        component: ErrorMsgComponent,
    }

];
