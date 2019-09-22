import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetail;
  constructor( private userService:UserService, private router:Router){}

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res=>{
        this.userDetail = res['user'];
        // @ts-ignore
        console.log(this.userDetail);
      },
      error => {

      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }
}
