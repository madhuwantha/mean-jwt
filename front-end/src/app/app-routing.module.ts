import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from "./components/user/sign-up/sign-up.component";
import {SignInComponent} from "./components/user/sign-in/sign-in.component";
import {UserProfileComponent} from "./components/user/user-profile/user-profile.component";
import {AuthGuard} from "./auth/auth.guard";


const routes: Routes = [
  {
    path: 'register' ,component:SignUpComponent,
  },
  {
    path:'login',component:SignInComponent
  },
  {
    path:'profile',component:UserProfileComponent,canActivate:[AuthGuard]
  },
  {
    path:'',redirectTo:'/login',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
