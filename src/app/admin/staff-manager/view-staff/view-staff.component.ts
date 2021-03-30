import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StaffsService } from '../staffs.service';
import { StaffResponseModel } from './staff-response-model';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {
  staffs: Array<StaffResponseModel> = [];
  deleteSuccess : boolean;
  page = 0;

  constructor(private staffService: StaffsService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getAllStaff();
  }

  getAllStaff(){
    this.staffService.getAllStaffs(this.page).subscribe(data =>{
      this.staffs = data;
    });
  }

  deleteStaff(id: number){
    this.staffService.deleteStaff(id).subscribe(() =>{
      this.toastr.success('Xóa thành công')
      this.deleteSuccess = true;
      if(this.deleteSuccess){
        this.getAllStaff();
      }
    }, () => {
      this.toastr.error('Xóa thất bại! Vui lòng kiểm tra lại');
  });
  }

  onPage(page: number){
     this.page = page;
     this.getAllStaff();
  }

}
