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
        console.log(product, 'to add to cart');
        const existingProduct = this.cartItemList.find((item: Product) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity = product.quantity;
            console.log('Updated product quantity in cart:', existingProduct);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product quantity updated in your cart!",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            if (!this.itemExists([product.id])) {
                this.cartItemList.push(product);
                console.log('Product added to cart:', this.cartItemList);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product successfully added to your cart!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        this.productTotalCartItems.next(this.cartItemList);
    }


    proceedCheckout(items: any){
        this.selectedItems.push(items)
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

    getSelectedItems() {
        return this.selectedItems;
    }


    setSelectedItems(items: any[]) {
        this.selectedItems = items;
        this.cartItemList = this.cartItemList.filter((item: any) => !items.includes(item.id));
        this.productTotalCartItems.next(this.cartItemList);
    }
}