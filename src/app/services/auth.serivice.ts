import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private loginUrl = 'https://fakestoreapi.com/auth/login';

    constructor(
        private http: HttpClient
    ) {
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
    loginUser(data:any) {
        return this.http.post<any>(this.loginUrl,data);
    }




}