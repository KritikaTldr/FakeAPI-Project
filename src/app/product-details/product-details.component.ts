import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllProduct } from '../services/all-product.service';
import { Product } from "../interface/product.interface";
import { NavbarComponent } from "../navbar/navbar.component";
import { TitleCasePipe } from "@angular/common";
import { AllProductComponent } from "../all-product/all-product.component";
import { AuthService } from "../services/auth.serivice";
import { FormsModule } from '@angular/forms';
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        NavbarComponent,
        TitleCasePipe,
        AllProductComponent,
        FormsModule,
        NgIf
    ],
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    id!: string | null;
    product!: Product;
    quantity: number = 1; // Initial quantity
    maxQuantity: number = 5;
    message: string = '';
    public products: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _service: AllProduct,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this._service.getProductById(this.id).subscribe({
                next: (res) => {
                    this.product = res;
                },
                error: (err) => {
                    console.error(err);
                }
            });
        }
    }

    addtocart(product: any, event: any) {
        event.stopPropagation();
        if (this.authService.isLoggedIn()) {
            const productQuantity = { ...product, quantity: this.quantity };
            this._service.addToCart(productQuantity);
        } else {
            alert('Please log in to add product to cart');
            this.router.navigate(['/login']).then();
        }
    }

    navigate() {
        this.router.navigate(['/']).then();
    }

    buyNow(product: any) {
        if (this.authService.isLoggedIn()) {
            const productQuantity = { ...product, quantity: this.quantity };
            this._service.proceedCheckout(productQuantity);
            this.router.navigate(['checkout']).then();
        } else {
            alert('Please log in to buy product(s).');
            this.router.navigate(['/login']).then();
        }
    }

    increaseQuantity(): void {
        if (this.quantity < this.maxQuantity) {
            this.quantity++;
            this.message = '';
        } else {
            this.message = `Cannot increase quantity beyond ${this.maxQuantity}`;
            setTimeout(() => {
                this.message = '';
            }, 3000);
        }
    }

    decreaseQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
            this.message = '';
        }
    }
}
