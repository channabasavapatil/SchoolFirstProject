import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  Login(form: NgForm) {
    if (form.invalid) {
      return;
      }
    alert( form.value.sName);
    alert( form.value.uPassword);

  }
}
