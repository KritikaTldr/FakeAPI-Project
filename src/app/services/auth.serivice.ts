import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private loginUrl = 'https://fakestoreapi.com/auth/login';
    private loggedIn = new BehaviorSubject<boolean>(false);
    private currentUser = new BehaviorSubject<string | null>(null);

    constructor(
        private http: HttpClient
    ) {
    }
    login(userName: string) {
        this.loggedIn.next(true);
        this.currentUser.next(userName);
    }
    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
    loginUser(data:any) {
        return this.http.post<any>(this.loginUrl,data);
    }




}