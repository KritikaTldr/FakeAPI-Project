import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {AllProduct} from '../services/all-product.service';
import {FormsModule} from '@angular/forms';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [NgIf, NgForOf, FormsModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    public products: any[] = [];

    constructor(private allProduct: AllProduct,
                private router: Router) {
    }

    ngOnInit() {
        this.loadCart();
    }

    private loadCart() {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            this.products = JSON.parse(cartData).map((product: any) => ({
                ...product,
                checked: false
            }));
        } else {
            this.getCartItemList();
        }
    }

    private getCartItemList() {
        this.allProduct.getItemProduct().subscribe((res: any) => {
            this.products = res.map((product: any) => ({
                ...product,
                checked: false
            }));
            this.saveToLocalStorage();
        });
    }

    private saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.products));
    }

    removeItem() {
        const idsToRemove: number[] = this.products
            .filter((item: any) => item.checked)
            .map((item: any) => item.id);
        this.allProduct.removeFromCart(idsToRemove);
        this.products = this.products.filter((item: any) => !item.checked);
        this.saveToLocalStorage();
    }

    checkoutPage() {
        const selectedItems = this.products.filter(item => item.checked);
        if (selectedItems.length === 0) {
            Swal.fire({
                text: "Please select at least one item to proceed to checkout.",
                icon: "question"
            });
            return;
        }
        const idsToRemove: number[] = this.products
            .filter((item: any) => item.checked)
            .map((item: any) => item.id);
        this.allProduct.removeFromCart(idsToRemove);
        this.products = this.products.filter((item: any) => !item.checked);
        this.allProduct.setSelectedItems(selectedItems);
        this.saveToLocalStorage();
        this.router.navigate(['/checkout']).then();
    }
    navigate(){
        this.router.navigate(['/']).then();
    }
}
