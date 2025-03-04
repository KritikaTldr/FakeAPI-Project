import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.serivice";
import {NgForOf, NgIf} from "@angular/common";
import {AllProduct} from "../services/all-product.service";

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
export class NavbarComponent implements OnInit {
    authService = inject(AuthService);
    isloggedIn: boolean = false;
    public totalItem : number = 0;


    constructor(
        private router: Router,
        private _service: AllProduct,
    ) {
    }

    ngOnInit() {
        this.authService.checkLogin.subscribe((res) => {
            this.isloggedIn = this.authService.isLoggedIn();
        });
        this._service.getItemProduct().subscribe(res=>{
            this.totalItem = res.length;
        })
    }


    navigate() {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/cart']).then();
        } else {
            alert('Please login first')
        }
    }

    homePage() {
        this.router.navigate(['/']).then()
    }

    loginPage() {
        this.router.navigate(['/login']).then()
    }

    signupPage() {
        this.router.navigate(['/sign-up']).then()


    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        this.authService.checkLogin.next(false);
        this.router.navigate(['/login']).then()

    }
}
