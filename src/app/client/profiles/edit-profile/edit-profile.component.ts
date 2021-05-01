import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerResponseModel } from 'src/app/shared/model/responses/customer-reponse-model';
import { FirebaseService } from 'src/app/shared/upload-file/firebase.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  customerModel: CustomerResponseModel;
  customerForm: FormGroup;
  selectedFile: File[] = null;
  urlFile : '';

  constructor( private datepipe: DatePipe, private customerService: CustomerService,
     private firebaseService: FirebaseService, private toastr: ToastrService) { }

  ngOnInit(): void {
      this.getCustomerProfile();

      this.customerForm = new FormGroup({
        customerId: new FormControl(""),
        email: new FormControl(""),
        phone: new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
        cardId: new FormControl("", [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
        name: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        birthday: new FormControl(""),
        gender: new FormControl(""),
        address: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
      });
  }

  getCustomerProfile(){
      this.customerService.getCustomerProfile().subscribe((data) => {
        let convertData:any = data;
        let convertBirth = new Date(data.birthday);
        convertData.birthday = this.datepipe.transform(convertBirth, 'yyyy-MM-dd');
        this.customerModel = convertData;

        this.customerForm.patchValue(convertData);
      })
  }

  postUpdateProfile(){
    this.customerModel.name = this.customerForm.get('name').value;
    this.customerModel.cardId = this.customerForm.get('cardId').value;
    this.customerModel.phone = this.customerForm.get('phone').value;
    this.customerModel.birthday = Date.parse(this.customerForm.get('birthday').value);
    this.customerModel.gender = this.customerForm.get('gender').value;
    this.customerModel.address = this.customerForm.get('address').value;
    this.customerModel.image = this.customerModel.image;
    
    this.customerService.postUpdateProfile(this.customerModel).subscribe((data) => {
      this.toastr.success("Cập nhật thành công");
    }, error => {
      this.toastr.error(error.error.mess);
    });
  }

  uploadImage(){
    const fb = new FormData();
    for(var i=0; i<this.selectedFile.length; i++){
      fb.append('files', this.selectedFile[i]);
    }
    this.firebaseService.uploadFiles(fb).subscribe((data) => {
      this.urlFile = data.join();
      this.editAvatar();
    }, (error) => {
      this.toastr.error(error.error.mess);
    });
  }

  editAvatar(){
    this.customerService.postEditImage(this.urlFile).subscribe((data) => {
      this.toastr.success(data.mess);
    }, (error) => {
      this.toastr.error(error.error.mess);
    });
  }

  getFiles(event){
    this.selectedFile = event.target.files;
}

}
