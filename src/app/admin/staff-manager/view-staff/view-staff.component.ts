import { Component, OnInit } from '@angular/core';
import { StaffsService } from '../staffs.service';
import { StaffsModel } from './staffs-model';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {
  staffs: Array<StaffsModel> = [];

  constructor(private staffService: StaffsService) { 
    this.staffService.getAllStaffs().subscribe(staff =>{
      this.staffs = staff;
    });
  }

  ngOnInit(): void {
  }

}
