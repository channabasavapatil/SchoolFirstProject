import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {} from '../newentry/studententry';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() users: Array<any>;
  Valuepassing: number;
  Arrayofstudents: Array<any>;
  // tslint:disable-next-line: variable-name
  constructor(private _dataservice: DataService, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    console.log(this.dateFromObjectId('5e6f5378d8af6c1fc0123096'));
  }
  Setvalue(value1: any) {
     this.spinner.show();
     this._dataservice.getoneusers(value1).subscribe(res => {
                                                            this.Arrayofstudents = res;
                                                          },
                                                     err => { console.log('Error'); },
                                                     () => { this.spinner.hide();  });
    }
   dateFromObjectId(objectId) {
      return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    }
}
