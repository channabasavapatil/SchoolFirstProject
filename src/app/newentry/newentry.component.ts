import { Component, OnInit } from '@angular/core';
import {FormsModule, } from '@angular/forms';
import {DataService} from '../data.service';
import { Alert } from 'selenium-webdriver';
import {studentlist} from './studententry';
import { MatSnackBar } from '@angular/material';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-newentry',
  templateUrl: './newentry.component.html',
  styleUrls: ['./newentry.component.css']
})
export class NewentryComponent implements OnInit {
   NewUsers: Array<any>;
   Result: string;
  // tslint:disable-next-line: variable-name
  ngOnInit() {
    this.LoadNewData();
  }
  constructor(private _Dataservc: DataService,
              private _snackBar: MatSnackBar,
              private spinner: NgxSpinnerService)
              { }
someevnt(form: NgForm) {
// console.log(this.registerform.invalid);
if (form.invalid) {
  this.openSnackBar('Enter All Details', 'ok');
  return;
}
const Listofstudents: studentlist = {
      id: '1',
      Name: form.value.sName,
      sFName : form.value.sFName,
      Grade : form.value.sGrade,
      Class : form.value.sClass
  };
form.resetForm();
this._Dataservc.InsertUser(Listofstudents)
                            .subscribe(
                                    res => {
                                              this.Result = res.message;
                                              this.LoadNewData();
                                            },
                                    err => {
                                             this.Result = 'Inserted Succefully';
                                             this.openSnackBar(err, 'ok');
                                            },
                                    () =>  {
                                           this.openSnackBar(this.Result, 'ok');
                                           form.reset();
                                           });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  LoadNewData() {
    this._Dataservc.getusers().subscribe(
      res => {this.NewUsers = res; },
      err => {console.log('Error'); },
      () => {this.spinner.hide(); }
      );
  }
}
