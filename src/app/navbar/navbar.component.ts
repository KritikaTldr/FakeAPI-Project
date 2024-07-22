import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.serivice";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink,
        NgForOf,
        NgIf
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  isloggedIn: boolean = this.authService.isLoggedIn();

  constructor(
      private router: Router,
  ) {
  }
  navigate() {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/cart']).then();
    }else{
      alert('Please login first')
    }
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
