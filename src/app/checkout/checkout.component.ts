import {Component, Input} from '@angular/core';
import {AllProduct} from "../services/all-product.service";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import Swal from "sweetalert2";

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
  totalPrice: number = 0;

  constructor(private _service: AllProduct,
              private router: Router) { }

  ngOnInit(): void {
    this.selectedItems = this._service.getSelectedItems();
    console.log(this.selectedItems)
    this.calculateTotalPrice();
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.selectedItems.reduce((sum, item) => sum + item.price, 0);
  }

  confirmOrder(){
    Swal.fire('Woohoo!! Your order has been placed.', 'Happy Shopping!!!', 'success');
    this.router.navigate(['/']);
  }
}
