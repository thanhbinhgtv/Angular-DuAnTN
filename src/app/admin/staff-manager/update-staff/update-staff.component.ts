import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StaffsService } from '../staffs.service';
import { StaffResponseModel } from '../view-staff/staff-response-model';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {
  staffForm: FormGroup;
  staff: StaffResponseModel;
  staffId: number;

  constructor(private staffService: StaffsService, private activateRoute: ActivatedRoute) { 
    this.staffId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getStaffById();

    this.staffForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required, Validators.minLength(9)]),
      cardId: new FormControl("", [Validators.required, Validators.minLength(9)]),
      address: new FormControl("", [Validators.required, Validators.minLength(6)]),
      birthday: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
  }

  updateStaff(){
    
  }

  getStaffById(){
    this.staffService.getStaffsById(this.staffId).subscribe((data) => {
        this.staff = data;
    })
  }
}
