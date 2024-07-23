import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { AllProduct } from '../services/all-product.service';
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";

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
              private router: Router,
              private _service: AllProduct) {}

  ngOnInit() {
    this.getCartItemList();
  }

  private getCartItemList() {
    this.products = this.getCartFromLocalStorage();

    if (this.products.length === 0) {
      this.allProduct.getItemProduct().subscribe((res: any) => {
        this.products = res.map((product: any) => ({
          ...product,
          checked: false
        }));
        this.saveCartToLocalStorage();
      });
    }
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.products));
  }

  private getCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  removeItem() {
    const idsToRemove: number[] = this.products
        .filter((item: any) => item.checked)
        .map((item: any) => item.id);
    this.allProduct.removeFromCart(idsToRemove);
    this.products = this.products.filter((item: any) => !item.checked);
    this.saveCartToLocalStorage();
  }

  checkoutPage() {
    const selectedItems = this.products.filter(item => item.checked);
    this._service.setSelectedItems(selectedItems);
    this.products = this.products.filter(item => !item.checked);
    this.router.navigate(['/checkout']).then();
  }
}
