import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminModule } from '../../admin.module';
import { StaffsService } from '../staffs.service';
import { StaffRequestModel } from './staff-request-model';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {
  StaffForm: FormGroup;
  staffModel: StaffRequestModel;
  timestamp = 1587168000000;

  constructor(private staffService: StaffsService, private router: Router, private toastr: ToastrService) { 
    this.staffModel = {
      address: '',
      birthday: null,
      cardId: '',
      email: '',
      gender: true,
      image: 'img/binh.jpg',
      name: '',
      pass: '',
      phone: '',
      role: true,
    };
  }

  ngOnInit(): void {
    this.StaffForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      cardId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      birthday: new FormControl('',Validators.required),
      gender: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
    });

  }

  createStaff(){
        this.staffModel.name = this.StaffForm.get('name').value;
        this.staffModel.email = this.StaffForm.get('email').value;
        this.staffModel.phone = this.StaffForm.get('phone').value;
        this.staffModel.cardId = this.StaffForm.get('cardId').value;
        this.staffModel.address = this.StaffForm.get('address').value;
        this.staffModel.birthday = Date.parse(this.StaffForm.get('birthday').value);
        this.staffModel.gender = this.StaffForm.get('gender').value;
        this.staffModel.role = this.StaffForm.get('role').value;
        this.staffModel.pass = this.StaffForm.get('pass').value;
        // this.staffModel.image = this.StaffForm.get('image').value;
    
        this.staffService.createStaff(this.staffModel).subscribe(() => {
        this.router.navigate(['/admin/staff'], { queryParams: { registered: 'true' } });
        this.toastr.success('Thành công')
        }, (error) => {
          this.toastr.error('Thêm thất bại! Vui lòng kiểm tra lại');
          console.log(error);
      });
  }

}
