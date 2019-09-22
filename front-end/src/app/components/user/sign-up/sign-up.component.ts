import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user_ :User = {
    name:'',
    email:'',
    password:''
  };
  e :string;
  t :boolean = false;


  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  onSubmit(signUpForm: NgForm) {
    const u = {
      name:this.user_.name,
      email:this.user_.email,
      password:this.user_.password
    };
    this.userService.postUser(u).subscribe(
      res=>{
          this.t = true;
          this.resetForm(signUpForm);
      },
      err => {
          if ( err.status === 422 ){
            this.e = err.error.join('<br/>');
          }else {
            this.e = err.error.toString;
          }
      }
    )
  }
  resetForm(form:NgForm){
    this.user_ = {
      name:'',
      email:'',
      password:''
    };
    form.resetForm();
    this.e = '';
  }

}
