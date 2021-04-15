import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  messNumber : number;
  isloading : boolean;

  constructor(private staffService: StaffsService, private router: Router, private toastr: ToastrService) { 
    this.staffModel = {
      address: '',
      birthday: 0,
      cardId: '',
      email: '',
      gender: true,
      image: '',
      name: '',
      pass: '',
      phone: '',
      role: true,
    };
  }

  ngOnInit(): void {
    this.StaffForm = new FormGroup({
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

  createStaff(){
    if(this.StaffForm.get('name').errors?.required){
      this.messNumber = 1;
    }else if(this.StaffForm.get('name').errors?.minlength){
      this.messNumber = 2;
    }else if(this.StaffForm.get('email').errors?.required){
      this.messNumber = 3;
    }else if(this.StaffForm.get('email').errors?.email){
      this.messNumber = 4;
    }else if(this.StaffForm.get('phone').errors?.required){
      this.messNumber = 5;
    }else if(this.StaffForm.get('phone').errors?.minlength){
      this.messNumber = 6;
    }else if(this.StaffForm.get('cardId').errors?.required){
      this.messNumber = 7;
    }else if(this.StaffForm.get('cardId').errors?.minlength){
      this.messNumber = 8;
    }else if(this.StaffForm.get('address').errors?.required){
      this.messNumber = 9;
    }else if(this.StaffForm.get('address').errors?.minlength){
      this.messNumber = 10;
    }else if(this.StaffForm.get('birthday').errors?.required){
      this.messNumber = 11;
    }else if(this.StaffForm.get('gender').errors?.required){
      this.messNumber = 12;
    }else if(this.StaffForm.get('role').errors?.required){
      this.messNumber = 13;
    }else if(this.StaffForm.get('password').errors?.required){
      this.messNumber = 14;
    }else if(this.StaffForm.get('password').errors?.minlength){
      this.messNumber = 15;
    }else if(this.StaffForm.get('repassword').errors?.required){
      this.messNumber = 16;
    }else if(this.StaffForm.get('repassword').errors?.minlength){
      this.messNumber = 17;
    }else if(this.StaffForm.get('password').value != this.StaffForm.get('repassword').value){
      this.messNumber = 18;
    }else{
        this.messNumber = 19;
        this.isloading = true;
        this.staffModel.name = this.StaffForm.get('name').value;
        this.staffModel.email = this.StaffForm.get('email').value;
        this.staffModel.phone = this.StaffForm.get('phone').value;
        this.staffModel.cardId = this.StaffForm.get('cardId').value;
        this.staffModel.address = this.StaffForm.get('address').value;
        this.staffModel.birthday = Date.parse(this.StaffForm.get('birthday').value);
        this.staffModel.gender = this.StaffForm.get('gender').value;
        this.staffModel.role = this.StaffForm.get('role').value;
        this.staffModel.pass = this.StaffForm.get('password').value;
        // this.staffModel.image = this.url;
        
        this.staffService.createStaff(this.staffModel).subscribe(() => {
        this.router.navigate(['/admin/staff'], { queryParams: { registered: 'true' } });
        this.toastr.success('Thành công')
        }, (error) => {
          this.toastr.error(error.error.mess);
          this.isloading = false;
      });
    }
  }

}
