import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminProfileResponse } from 'src/app/shared/model/responses/admin-profile-response';
import { FirebaseService } from 'src/app/shared/upload-file/firebase.service';
import { AdminProfileService } from './admin-profile.service';

@Component({
  selector: 'app-admin-profiles',
  templateUrl: './admin-profiles.component.html',
  styleUrls: ['./admin-profiles.component.css']
})
export class AdminProfilesComponent implements OnInit {
  adminModel: AdminProfileResponse;
  adminForm: FormGroup;
  selectedFile: File[] = null;
  urlFile : '';

  constructor(private datepipe: DatePipe, private adminService: AdminProfileService,
    private firebaseService: FirebaseService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAdminProfile();
  }

  getAdminProfile(){
    this.adminService.getProfileAdmin().subscribe((data) => {
      let convertData:any = data;
      let convertBirth = new Date(data.birthday);
      convertData.birthday = this.datepipe.transform(convertBirth, 'yyyy-MM-dd');
      this.adminModel = convertData;
      
      // this.adminForm.patchValue(convertData);
    })
  }

}
