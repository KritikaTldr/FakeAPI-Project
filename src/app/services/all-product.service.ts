import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map} from 'rxjs';
import {Product} from '../interface/product.interface';
import Swal from "sweetalert2";
@Injectable({
    providedIn: 'root'
})

export class AllProduct {
    private productUrl = 'https://fakestoreapi.com/products';
    public cartItemList: any = [];
    public productTotalCartItems = new BehaviorSubject<any>([]);
    private selectedItems: any[] = [];
    constructor(private http: HttpClient) {
    }

    getAllProduct() {
        return this.http.get(this.productUrl).pipe(
            map((res) => res)
        );
    }
    getProductById(id: string | null) {
        return this.http.get<Product>(`${this.productUrl}/${id}`);
    }

    getItemProduct() {
        return this.productTotalCartItems.asObservable();
    }

    setItemProduct(product: any) {
        this.cartItemList.push(...product);
        this.productTotalCartItems.next(product);
    }


    addToCart(product: any) {
        if (!this.itemExists([product.id])) {
            this.cartItemList.push(product);
            this.productTotalCartItems.next(this.cartItemList);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product successfully added to your cart!",
                showConfirmButton: false,
                timer: 1500
            });
            this.getTotalPrice();
            console.log('Product added to cart:', this.cartItemList);
        } else {
            console.log('Product already exists in cart:', product);
            alert('Product already exists in cart!!!');
        }
    }

    getTotalPrice() {
        let grandTotal = 0;
        this.cartItemList.map((a: any) => {
            grandTotal += a.total;
        })
    }

    removeFromCart(productIds: number[]) {
        // console.log(productIds);
        this.cartItemList = this.cartItemList.filter((item: any) => !productIds.includes(item.id));
        this.productTotalCartItems.next(this.cartItemList);
        console.log(this.cartItemList);
    }

    itemExists(productIds: number[]): boolean {
        return this.cartItemList.some((item: any) => productIds.includes(item.id));
    }

    setSelectedItems(items: any[]) {
        this.selectedItems = items;
        this.cartItemList = this.cartItemList.filter((item: any) => !items.includes(item.id));
        this.productTotalCartItems.next(this.cartItemList);

    }

    getSelectedItems() {
        return this.selectedItems;
    }
}