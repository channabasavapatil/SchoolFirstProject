import { Component, OnInit } from '@angular/core';
import {DataService} from './data.service';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My School Project !!';

  Tabs: any;
  SchoolName: Array<any>;
  // tslint:disable-next-line: variable-name
  constructor(private _dataservice: DataService) {
      this._dataservice.getSchoolName().subscribe(res => this.SchoolName = res);
      // this._dataservice.getTabs().subscribe(tabs => this.Tabs = tabs);
  }
}
