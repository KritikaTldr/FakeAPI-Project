import {Component, Input} from '@angular/core';
import {AllProduct} from "../services/all-product.service";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  selectedItems: any[] = [];

  constructor(private _service: AllProduct,
              private router: Router) { }

  ngOnInit(): void {
    this.selectedItems = this._service.getSelectedItems();
  }

  confirmOrder(){
    alert("Your order has been placed successfully");
    this.router.navigate(['/']);
    localStorage.removeItem('cart');
  }
}
