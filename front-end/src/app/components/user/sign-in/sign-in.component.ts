import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor( private userService : UserService ,private  router :Router) { }

  m = {
    email:' ',
    password: ' '
  };


  errMassage :string;

  ngOnInit() {
  }

  onSubmit(form: NgForm) {


    const u = {
      email:this.m.email,
      password:this.m.password
    };

    this.userService.login(u).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/profile');
      },
      err =>{
        this.errMassage = err.error.message;
      }
    );
  }
}
