import {Component, OnInit} from '@angular/core';
import {AllProduct} from "../services/all-product.service";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {Product} from "../interface/product.interface";
import {TruncatePipe} from '../pipes/truncate.pipe';
import {NavbarComponent} from "../navbar/navbar.component";
import {Router, RouterLink} from '@angular/router';


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

    // navigate() {
    //     alert('Product added to cart successfully')
    //         this.router.navigate(['/cart']).then()
    // }

    addtocart(product: any) {
        this._service.addToCart(product);
        alert('Product added to cart successfully');
        this.router.navigate(['/cart']).then()
    }
}
