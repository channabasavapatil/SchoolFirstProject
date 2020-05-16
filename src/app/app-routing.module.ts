import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../app/home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { NewentryComponent } from './newentry/newentry.component';
import{ LoginComponent} from './login/login.component';
import{ SignupComponent} from './signup/signup.component';


const routes: Routes = [
  { path: 'NewEnrty', component: NewentryComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'SignUp', component: SignupComponent},
  { path: '', redirectTo: '/NewEnrty', pathMatch: 'full' },
  { path: '*', redirectTo: '/NewEnrty', pathMatch: 'full' }
  // { path:'Home',component:HomeComponent},
  // { path:'Profile',component:ProfileComponent},
  // { path:'Admin',component:AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
