import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  successMessage:string='';
  errorMessage:string='';
  isLoading:boolean=false;

    loginForm:FormGroup = new FormGroup({
    email:new FormControl(null ,[Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) ,  Validators.required]),
    password:new FormControl(null ,[Validators.pattern(/(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-z0-9\W]{8,10}/) , Validators.required]),
  })

  loginFormFun(loginForm:FormGroup)
  {
    if(this.loginForm.valid)
    {
      this.isLoading=true;
      this._AuthService.signin(loginForm.value).subscribe({
        next:(response)=>
        {
          if(response.message === 'success')
          {
                  //  navigate
                  this.isLoading=false;
                  this.successMessage = response.message;
                  this._Router.navigate(['/home']);
                  localStorage.setItem('userToken' , response.token);
                  this._AuthService.userTokenFun();
          }
          else
          {
            this.isLoading=false;
            this.errorMessage = response.message;
          }
        }
  })
    }
          // console.log(this.loginForm.value)

        
  }
  

  ngOnInit(): void {
    $('#signIn').particleground();
  }

}
