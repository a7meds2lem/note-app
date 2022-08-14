import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthService:AuthService) { }

  isLogin:boolean=false;

  logOut(){
    this._AuthService.logOut()
  }

  ngOnInit(): void {

    this._AuthService.userToken.subscribe({
      next:()=>
      {
        if(this._AuthService.userToken.getValue() != null)
        {
          this.isLogin = true;
        }
        else
        {
          this.isLogin = false;
        }
      }
    })
  }

}
