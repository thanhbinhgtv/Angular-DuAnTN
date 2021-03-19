import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {
  staffForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  updateStaff(){
    
  }
}
