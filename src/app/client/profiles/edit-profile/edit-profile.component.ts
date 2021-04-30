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
        phone: new FormControl(""),
        cardId: new FormControl(""),
        name: new FormControl(""),
        birthday: new FormControl(""),
        address: new FormControl(""),
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
