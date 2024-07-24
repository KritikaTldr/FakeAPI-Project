import {Component, Input} from '@angular/core';
import {AllProduct} from "../services/all-product.service";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import Swal from "sweetalert2";
import {TruncatePipe} from "../pipes/truncate.pipe";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    SlicePipe,
    TruncatePipe,
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
    this.productTotalPrice();
  }
  productTotalPrice(): void {
    this.totalPrice = this.selectedItems.reduce((sum, item) => sum + item.price, 0);
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
  }

  confirmOrder(){
    Swal.fire('Woohoo!! Your order has been placed.', 'Happy Shopping!!!', 'success');
    this.router.navigate(['/']);
  }
}
