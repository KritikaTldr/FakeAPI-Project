import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AllProduct} from "../services/all-product.service";
import {AuthService} from "../services/auth.serivice";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    LoginForm!: FormGroup

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private _service: AuthService,  // replace with service name
    ) {
    }

    signupPage() {
        this.router.navigate(['/sign-up']).then()
    }

    ngOnInit() {
        this.setupForm();
    }

    private setupForm() {
        this.LoginForm = this.formBuilder.group({
            username: ['mor_2314', [Validators.required]],
            password: ['83r5^_', Validators.required],
        });
    }
  onLogin(){
    if(this.LoginForm.valid){
        this._service.loginUser(this.LoginForm.value).subscribe({
            next:(res) => {
                console.log(res.token)
                localStorage.setItem('token', res.token);
                alert('Login successful!')
                this.router.navigate(['/']).then()
            },
            error:(err) => {
                console.log(err)
                alert('Invalid username or password')
                // this.router.navigate(['/login']).then()
            }
        })
    } else {
      alert('Form is invalid');
    }
  }

}
