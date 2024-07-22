import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
      private router: Router
  ) {
  }
  navigate() {
    this.router.navigate(['/cart']).then()
  }

  homePage() {
    this.router.navigate(['/']).then()
  }

  loginPage() {
    this.router.navigate(['/login']).then()
  }

  signupPage(){
    this.router.navigate(['/sign-up']).then()

}
}
