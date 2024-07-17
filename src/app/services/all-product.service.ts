import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {ProductList} from "../interface/product.interface";
@Injectable({
    providedIn: 'root'
})

export class AllProduct{
    private productUrl = 'https://fakestoreapi.com/products';
    constructor(private http :HttpClient) {
    }

    getAllProduct(){
        return this.http.get(this.productUrl).pipe(
            map((res) => res)  // assuming res is an array of product objects
        );
    }


}