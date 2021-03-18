import { Component, OnInit } from '@angular/core';
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

  constructor(private staffService: StaffsService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getAllStaff();
  }

  getAllStaff(){
    this.staffService.getAllStaffs().subscribe(staff =>{
      this.staffs = staff;
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

}
