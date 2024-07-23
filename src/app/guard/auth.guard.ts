import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree, Router,
} from "@angular/router";
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.serivice";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService,
                private router: Router){}
    canActivate(){
       if( this.authService.isLoggedIn()){
           return true;
       }
       else{
        this.router.navigate(['login']).then();
        return false;
       }
    }
}