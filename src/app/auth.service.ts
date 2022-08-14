import { Data, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotExpr } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HTTpClient:HttpClient , private _Router:Router) { 
    if(localStorage.getItem('userToken'))
    {
      this.userTokenFun()
    }
  }

  userToken = new  BehaviorSubject(null);

  userTokenFun()
  {
   //   let encodedToken: any = localStorage.getItem('userToken');
     let encodedToken =JSON.stringify( localStorage.getItem('userToken'));
     let decodedToken:any = jwtDecode(encodedToken);
     this.userToken.next(decodedToken);
  //  console.log(this.userToken)
  }

  baseURL:string='https://routeegypt.herokuapp.com/'
  
  signUp(dataForm:any):Observable<any>
  {
     return this._HTTpClient.post(`${this.baseURL}signup` , dataForm)
  }
  signin(dataForm:any):Observable<any>
  {
     return this._HTTpClient.post(`${this.baseURL}signin` , dataForm)
  }
  logOut()
  {
       localStorage.removeItem('userToken');
       this.userToken.next(null);
       this._Router.navigate(['/login'])
  }
  // /addNote  getUserNotes
  addNote(data:any):Observable<any>
  {
     return this._HTTpClient.post(`${this.baseURL}addNote` , data)
  }
  getUserNotes(data:any):Observable<any>
  {
     return this._HTTpClient.post(`${this.baseURL}getUserNotes` , data)
  }
  // DeleteNote(data:any):Observable<any>
  // {
  //   let options = {
  //     header: new HttpHeaders({}),
  //     body:{
  //       NoteID:data.NoteID,
  //     token:data.token
  //     }
  //   }
  //    return this._HTTpClient.delete(`${this.baseURL}deleteNote` , options)
  // } updateNote
  deleteNote(data:any):Observable<any>
  {
    let option = {
          // header: new HttpHeaders({}),
          body:{
            NoteID:data.NoteID,
          token:data.token
          }
        }
        // console.log(option)
     return this._HTTpClient.delete(`${this.baseURL}deleteNote` , option)
  }
  updateNote(data:any):Observable<any>
  {
     return this._HTTpClient.put(`${this.baseURL}updateNote` , data)
  }
}
