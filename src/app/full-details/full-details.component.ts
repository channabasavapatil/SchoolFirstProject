import { Component, OnInit } from '@angular/core';
import {  Input  } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-full-details',
  templateUrl: './full-details.component.html',
  styleUrls: ['./full-details.component.css']
})
export class FullDetailsComponent implements OnInit {
  @Input() StdList: Array<any> ;
  AllStudents: Array<any>;
  constructor() { }
  ngOnInit() {
    // this._dataservice.getoneusers(this.id).subscribe(res => this.AllStudents = res);
  }
}
