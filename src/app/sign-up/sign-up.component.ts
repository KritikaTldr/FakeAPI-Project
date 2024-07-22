import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{

  registerForm! : FormGroup

  signupUsers: any[] =[];

  signupObj: any ={
    username: '',
    email:'',
    password: ''
  }
  constructor(
      private router: Router,
      private formBuilder: FormBuilder
  ) {
  }
  loginPage() {
    this.router.navigate(['/login']).then()
  }

  ngOnInit() {
    this.setupForm();
  }

  private setupForm(){
    this.registerForm = this.formBuilder.group({
      username: ['',Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      password: ['',Validators.required],
    });
  }

  onSignUp(){
    console.log(this.registerForm)
    if(this.registerForm.valid){
      this.router.navigate(['/login']).then()

      console.log(this.registerForm.value)
    } else {
      alert('Form is invalid');
    }
  }


}
