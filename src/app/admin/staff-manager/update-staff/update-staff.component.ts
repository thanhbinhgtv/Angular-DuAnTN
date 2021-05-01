import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/shared/upload-file/firebase.service';
import { StaffsService } from '../staffs.service';
import { StaffUpdateRequestModel } from './staff-update-request-model';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {
  staffForm: FormGroup;
  staffModel: StaffUpdateRequestModel;
  staffId: number;
  selectedFile: File[] = null;
  urlFiles : "";

  constructor(public datepipe: DatePipe, private firebaseService: FirebaseService, private staffService: StaffsService, private activateRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { 
    this.staffId = this.activateRoute.snapshot.params.id;
    
    datepipe = new DatePipe('en-US');
    // Test lại xem cần cái này ko?
    this.staffModel = {
      address: '',
      birthday: 0,
      cardId: '',
      gender: true,
      image: '',
      name: '',
      phone: '',
      role: true,
    };
  }

  ngOnInit(): void {
    this.getStaffById();

    this.staffForm = new FormGroup({
      email: new FormControl({value:"", disabled:true}, [Validators.required, Validators.minLength(6)]),
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      phone: new FormControl("", [Validators.required, Validators.minLength(9)]),
      cardId: new FormControl("", [Validators.required, Validators.minLength(9)]),
      address: new FormControl("", [Validators.required, Validators.minLength(6)]),
      birthday: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      role: new FormControl("", [Validators.required]),
      // image: new FormControl("", [Validators.required]),
    });
  }

  updateStaff(){
      const fb = new FormData();
      for(var i=0; i<this.selectedFile.length; i++){
          fb.append('files', this.selectedFile[i]);
      }
      this.firebaseService.uploadFiles(fb).subscribe((data) => {
          console.log(data);
          this.urlFiles = data.join();
          this.uploadForm();
      }, (error) => {
          this.toastr.error(error.error.mess);
      });
  }

  uploadForm(){
      this.staffModel.name = this.staffForm.get('name').value;
      this.staffModel.phone = this.staffForm.get('phone').value;
      this.staffModel.cardId = this.staffForm.get('cardId').value;
      this.staffModel.address = this.staffForm.get('address').value;
      this.staffModel.birthday = Date.parse(this.staffForm.get('birthday').value);
      this.staffModel.gender = this.staffForm.get('gender').value;
      this.staffModel.role = this.staffForm.get('role').value;
      this.staffModel.image = this.urlFiles;
        
      this.staffService.updateStaff(this.staffId, this.staffModel).subscribe(() => {
          this.router.navigate(['/admin/staff'], { queryParams: { registered: 'true' } });
          this.toastr.success('Cập nhật Thành công');
      }, () => {
          this.toastr.error('Cập nhật thất bại, vui lòng kiểm tra lại thông tin');
      });
  }
  
  getStaffById(){
    this.staffService.getStaffsById(this.staffId).subscribe((data) => {
        let convertData:any = data;
        let convertBirth = new Date(data.birthday);
        convertData.birthday = this.datepipe.transform(convertBirth, 'yyyy-MM-dd');
        this.staffModel = data;
        this.staffForm.patchValue(convertData);
    })
  }

  getFiles(event){
    this.selectedFile = event.target.files;
  }

}
