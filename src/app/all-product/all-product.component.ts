import {Component, OnInit} from '@angular/core';
import {AllProduct} from "../services/all-product.service";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {Product} from "../interface/product.interface";
import { TruncatePipe } from '../pipes/truncate.pipe';


@Component({
  selector: 'app-all-product',
  standalone: true,
    imports: [
        NgForOf,
        TruncatePipe,
        TitleCasePipe
    ],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css',
    providers : [TruncatePipe]
})
export class AllProductComponent implements OnInit{
        products :Product[]= []
      constructor(
          private allProduct : AllProduct
      ) {
      }
  ngOnInit() {
        this.getAllProduct();
  }

  getAllProduct(){
        this.allProduct.getAllProduct().subscribe({
          next: (res:Product[]|any) => {
              console.log(res)
              this.products = res;
          }
        });
  }
}
