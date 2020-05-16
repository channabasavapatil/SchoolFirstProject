import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { DataService } from '../data.service';
import {userInfo} from '../signup/UserInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataServc: DataService) { }

  ngOnInit() {
  }
  Login(form: NgForm) {
    if (form.invalid) {
      return;
      }
    const UserDetails: userInfo = { UserName: form.value.sName, Password: form.value.uPassword };

    if (form.invalid){
      return;
    }
    this.dataServc.LoginUser(UserDetails);
    // .subscribe(res =>{
    //   console.log(res.message);
    // },
    // err => {
    //     console.log(err);
    // },
    // () => {
    //   console.log('All Done');
    // });

  }
}
