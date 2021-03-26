import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffsService } from '../staffs.service';
import { StaffResponseModel } from '../view-staff/staff-response-model';

@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.component.html',
  styleUrls: ['./detail-staff.component.css']
})
export class DetailStaffComponent implements OnInit {
  staff: StaffResponseModel;
  staffId: number;

  constructor(private staffService: StaffsService, private activateRoute: ActivatedRoute) { 
    this.staffId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getStaffById();
  }

  getStaffById(){
    this.staffService.getStaffsById(this.staffId).subscribe((data) => {
        this.staff = data;
        console.log(this.staff);
        
    })
  }
}
