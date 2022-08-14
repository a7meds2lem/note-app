import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  successMessage:string='';
  errorMessage:string='';
  isLoading:boolean=false;

    registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null ,[Validators.minLength(3) , Validators.maxLength(10) , Validators.required]),
    last_name:new FormControl(null ,[Validators.minLength(3) , Validators.maxLength(10) , Validators.required]),
    email:new FormControl(null ,[Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) ,  Validators.required]),
    age:new FormControl(null ,[Validators.min(10) , Validators.max(90) , Validators.required]),
    password:new FormControl(null ,[Validators.pattern(/(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-z0-9\W]{8,10}/) , Validators.required]),
  })

  registerFormFun(registerForm:FormGroup)
  {
    this.isLoading=true;
  if(registerForm.valid){
    this._AuthService.signUp(registerForm.value).subscribe({
      next:(response)=>
      {
        if(response.message === 'success')
        {
                //  navigate
                this.isLoading=false;
                this.successMessage = response.message;
                this._Router.navigate(['/login'])
        }
        else
        {
          this.isLoading=false;
          this.errorMessage = response.message;
        }
      }
}) 
  }
          console.log(this.registerForm.value)
  }
  

  ngOnInit(): void {
    $('#signUp').particleground();
  }

}
