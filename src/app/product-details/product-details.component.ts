import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AllProduct } from '../services/all-product.service';
import {Product} from "../interface/product.interface";
import {NavbarComponent} from "../navbar/navbar.component";
import {TitleCasePipe} from "@angular/common";
import {AllProductComponent} from "../all-product/all-product.component";
import {AuthService} from "../services/auth.serivice";

@Component({
  selector: 'app-product-details',
  standalone: true,
    imports: [
        NavbarComponent,
        TitleCasePipe,
        AllProductComponent
    ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements  OnInit{
 id! : string | null;
  product!: Product;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private _service: AllProduct,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this._service.getProductById(this.id).subscribe({
      next:(res) => {
        console.log(res)
        this.product = res;
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

    addtocart(product: any,event : any) {
        event.stopPropagation()
        if(this.authService.isLoggedIn()){
            this._service.addToCart(product);
            this.router.navigate(['/cart']).then()
        }
        else{
            alert('Please Login to add product to cart')
            this.router.navigate(['/login']).then()
        }
    }

    navigate() {
      this.router.navigate(['/']).then()
    }

    buyNow(product: any){
        if(this.authService.isLoggedIn()){
            this._service.proceedCheckout(product);
            this.router.navigate(['checkout']).then()
        }
        else{
            alert('Please Login to buy product(s).')
            this.router.navigate(['/login']).then()
        }
    }
}
