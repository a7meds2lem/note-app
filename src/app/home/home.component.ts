import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import jwtDecode from 'jwt-decode';
declare var $:any
// import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  
  constructor(private _AuthService:AuthService) { 

    this.token=localStorage.getItem('userToken')
    this.decoded = this._AuthService.userToken.getValue()
    //  this.token = JSON.stringify(localStorage.getItem('userToken'));
    //  this.decoded = jwtDecode(this.token);
    // console.log(this.decoded)
  }
  
  data:FormGroup = new FormGroup({
      title: new FormControl(null),
      desc: new FormControl(null)
  })
  token:any
  decoded:any
  notes:any;
  noteID:any;
  nodata:boolean=false;
  isLoading:boolean=false;
  // ================ add note ======================
  addNote()
  {
    this.isLoading=true;
     let allNotes = {
       title:this.data.value.title,
       desc:this.data.value.desc,
       citizenID:this.decoded._id,
      token:this.token
   }
   this.data.reset()
  //  console.log(allNotes)
// console.log(this.token)
   this._AuthService.addNote(allNotes).subscribe((response)=>{
    // console.log(response);
    if(response.message == 'success')
    {
      this.isLoading=false;
      this.showAllNotes()
    }
   })
}
  // ================ /show notes ======================
  showAllNotes()
  {
    // this.nodata=true;
    this.isLoading=true;
   let forGetNotes={
      token:this.token,
      userID:this.decoded._id
    }
    // console.log(forGetNotes)
    this._AuthService.getUserNotes(forGetNotes).subscribe({
      next:(response)=>{
                this.notes = response.Notes;
                this.isLoading=false;
      }
    })
  }
  //    =================== Delete =================
 
  // getID(id:any)
  // {
  //     this.Note_ID = id;
  //  console.log(this.Note_ID)
  // }
  // deleteNote()
  // {
  //   let data={
  //     Note_ID:this.Note_ID,
  //     token:this.token
  //   }
  //   this._AuthService.DeleteNote(data).subscribe((response)=>{
  //     console.log(response);
  //     if(response.message == 'deleted')
  //     {
  //       this.showAllNotes()
  //       console.log('deleted')
  //     }
  //   })
  // }
   
  getID(data:any)
  {
    this.noteID=data
    // console.log(this.noteID)
  }                                   
deleteNote()
{
  // this.iaLoading=true;
  let data={
    NoteID:this.noteID,
    token:this.token
  }
  // console.log(data)

  this._AuthService.deleteNote(data).subscribe({
    next:(res)=>{
      console.log(res);
      this.showAllNotes();
        console.log('deleted');
    }
  })
}
//   =========== update Note=============================
update:FormGroup = new FormGroup({
  title: new FormControl(null),
  desc: new FormControl(null)
})

updateNote()
{
   let forUpdate={
    token:this.token,
    title:this.update.value.title,
    desc:this.update.value.desc,
    NoteID:this.noteID
   }
  //  console.log(this.update)
   this._AuthService.updateNote(forUpdate).subscribe({
    next:(res)=>{
      console.log(res);
      this.showAllNotes();
      this.update.reset;
    }
   })
}
setValue(data:any)
{
this.update.controls['title'].setValue(data.title);
this.update.controls['desc'].setValue(data.desc);
   
}

showNote(data:any){
    $('#showTitle').text(data.title),
    $('#showDesc').text(data.desc)
}

  ngOnInit(): void {
   this.showAllNotes();
    // console.log(this.token)
    // console.log(this.decoded._id)
// console.log(this.notes)
  }

}

