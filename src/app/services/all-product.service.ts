import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map} from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
    providedIn: 'root'
})

export class AllProduct {
    private productUrl = 'https://fakestoreapi.com/products';
    public cartItemList: any= [];
    public productTotalCartItems = new BehaviorSubject<any>([]);
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

    getItemProduct(){
        return this.productTotalCartItems.asObservable();
    }

    setItemProduct(product: any){
        this.cartItemList.push(...product);
        this.productTotalCartItems.next(product);
    }


    addToCart(product: any){
        this.cartItemList.push(product);
        this.productTotalCartItems.next(this.cartItemList);
        this.getTotalPrice();
        console.log(this.cartItemList)
    }

    getTotalPrice(){
        let grandTotal =0;
        this.cartItemList.map((a: any) =>{
            grandTotal += a.total;
        })
    }

    removeFromCart(product: any){
        this.cartItemList.map((a: any, index:any)=>{
            if(product.id===a.id){
                this.cartItemList.splice(index, 1);
            }
        })
    }

}