import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/shared/upload-file/firebase.service';
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
  selectedFile: File[] = null;
  urlFiles : "";

  constructor(private staffService: StaffsService, private firebaseService: FirebaseService, private router: Router, private toastr: ToastrService) { 
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
      image: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });

  }

  createStaff(){
    const fb = new FormData();
    for(var i=0; i<this.selectedFile.length; i++){
        fb.append('files', this.selectedFile[i]);
    }

    if(this.StaffForm.get('password').value != this.StaffForm.get('repassword').value){
        this.toastr.error("Mật khẩu và nhập lại mật khẩu phải giống nhau");
    }else{
        this.firebaseService.uploadFiles(fb).subscribe((data) => {
            console.log(data);
            this.urlFiles = data.join();
            this.uploadForm();
        }, (error) => {
            this.toastr.error(error.error.mess);
        });
    }
  }

  uploadForm(){
      this.staffModel.name = this.StaffForm.get('name').value;
      this.staffModel.email = this.StaffForm.get('email').value;
      this.staffModel.phone = this.StaffForm.get('phone').value;
      this.staffModel.cardId = this.StaffForm.get('cardId').value;
      this.staffModel.address = this.StaffForm.get('address').value;
      this.staffModel.birthday = Date.parse(this.StaffForm.get('birthday').value);
      this.staffModel.gender = this.StaffForm.get('gender').value;
      this.staffModel.role = this.StaffForm.get('role').value;
      this.staffModel.pass = this.StaffForm.get('password').value;
      this.staffModel.image = this.urlFiles;
        
      this.staffService.createStaff(this.staffModel).subscribe(() => {
          this.router.navigate(['/admin/staff'], { queryParams: { registered: 'true' } });
          this.toastr.success('Thành công')
      }, (error) => {
          this.toastr.error(error.error.mess);
      });
    }

  getFiles(event){
    this.selectedFile = event.target.files;
}

}
