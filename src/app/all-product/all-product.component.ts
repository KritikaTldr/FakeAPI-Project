import {Component, OnInit} from '@angular/core';
import {AllProduct} from "../services/all-product.service";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {Product} from "../interface/product.interface";
import {TruncatePipe} from '../pipes/truncate.pipe';
import {NavbarComponent} from "../navbar/navbar.component";
import {Router, RouterLink} from '@angular/router';
import {AuthService} from "../services/auth.serivice";

@Component({
    selector: 'app-all-product',
    standalone: true,
    imports: [
        NgForOf,
        TruncatePipe,
        TitleCasePipe,
        NavbarComponent,
        RouterLink
    ],
    templateUrl: './all-product.component.html',
    styleUrl: './all-product.component.css',
    providers: [TruncatePipe]
})
export class AllProductComponent implements OnInit {
    products: Product[] = []


    constructor(
        private allProduct: AllProduct,
        private router: Router,
        private _service: AllProduct,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.getAllProduct();
    }

    getAllProduct() {
        this.allProduct.getAllProduct().subscribe({
            next: (res: Product[] | any) => {
                console.log(res)
                this.products = res;
            }
        });
    }

    productDetails(id: number) {
        this.router.navigate(['/product/', id])
    }

    addtocart(product: any,event : any) {
        event.stopPropagation()
        if(this.authService.isLoggedIn()){
            this._service.addToCart(product);
        }
       else{
            alert('Please Login to add product to cart')
            this.router.navigate(['/login']).then()
        }
    }
}
