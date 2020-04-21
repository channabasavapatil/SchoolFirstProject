import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ID: number = 200;
  UserName: any;
  constructor(private _dataservice:DataService, private spinner: NgxSpinnerService) { }
  ngOnInit() {
        this.spinner.show();
        this._dataservice.getUserName(this.ID).subscribe(
          res => {this.UserName = res},
          err => {console.log('Error')},
          () => {this.spinner.hide();}
          );
      }
}
