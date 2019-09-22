import { Injectable } from '@angular/core';
import {User} from "../models/user";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = { headers: new HttpHeaders({'NoAuth':'True'})};

  constructor( private  http: HttpClient ) { }



  //http
  postUser(user :User):Observable<User>
  {
    return this.http.post<User>(environment.apiPath+'/users/new', user,this.noAuthHeader);
  }

  login(authCre){
    return this.http.post(environment.apiPath +'/users/login', authCre,this.noAuthHeader);
  }

  getUserProfile(){
    return this.http.get(environment.apiPath +'/users/profile');
  }









  //jwt
  setToken(token:string){
    localStorage.setItem('token',token);
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUsrPayload(){
    let token = this.getToken();
    if (token){
      let userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }else {
      return  null;
    }
  }
  isLoggedIn(){
    let userPlyload = this.getUsrPayload();
    if (userPlyload){
      return userPlyload.exp > Date.now()/1000;
    }else {
      return false;
    }
  }


}
