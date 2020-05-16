import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { DataService } from '../data.service';
import {userInfo} from './UserInfo';
import { AuthServiceService } from '../auth-service.service';

import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
//   UserDetails: userInfo;
 Result: string;

  constructor(private dataSrvce: DataService,
    private AuthService: AuthServiceService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  OnSignup(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('enter required details!!', 'ok');
      return;
      }
    const UserDetails: userInfo = { UserName: form.value.sName, Password: form.value.uPassword };
    this.dataSrvce.CreatUser(UserDetails).subscribe(res => {
      this.Result = res.message;

    },
err => {
     this.Result = 'Inserted Succefully';
     this.openSnackBar(err, 'ok');
    },
() =>  {
   this.openSnackBar(this.Result, 'ok');
   });
    form.resetForm();
  }
}
