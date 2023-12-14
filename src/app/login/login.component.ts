import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formbuildObj:FormBuilder, private apiService:ApiService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.formbuildObj.group({
      email: ['',Validators.required],
	    password: ['', Validators.required]
    })
  }

  loginForm:FormGroup;
  token:string;
  errorMessage: string = '';

  ngOnInit(): void {
  }

  submitForm(){
    let user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    if(!user.email && !user.password){
      this.errorMessage = 'Please enter Email and Password'
      this.toastr.error('Please enter mandatory fields', 'Error')
    }
      this.apiService.loginUser(user).subscribe({
        next:(response)=>{
          this.token = response?.data?.token
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', response?.data?.name)
          this.apiService.logginedUser.next(response?.data?.name)
          this.toastr.success('You have successfully logged in.', 'Login', {
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: false,
          });
          this.router.navigateByUrl('/joblist')
        },
        error:(err)=>{
          this.errorMessage = err?.error?.message
        }
      })
  }

  get email(){return this.loginForm.get("email")}
  get password(){return this.loginForm.get("password")}

}
