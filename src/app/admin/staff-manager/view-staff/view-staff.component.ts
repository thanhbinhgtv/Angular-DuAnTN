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
  staffsFilter: Array<StaffResponseModel> = [];
  deleteSuccess : boolean;
  value = '';
  status = 0;
  page = 0;
  arrayPage = new Array();
  numberPage: number;

  constructor(private staffService: StaffsService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getAllStaff();
  }

  getAllStaff(){
    this.status = 0;
    this.staffService.getAllStaffs(this.page).subscribe(data =>{
      this.staffs = data;
      this.staffsFilter = this.staffs.filter(staff => staff.name.toLowerCase().includes(this.value) 
      || staff.email.toLowerCase().includes(this.value));

      this.numberPage = data[0].pages;
      this.arrayPage = Array(this.numberPage).fill(0).map((x,i)=>i);
    });
  }

  getAllActiveOrBlockStaff(deleted: boolean){
      this.status = deleted ? 2 : 1;
      const filterData = this.staffs.filter(staff => staff.deleted === deleted && (staff.name.toLowerCase().includes(this.value) 
                        || staff.email.toLowerCase().includes(this.value)));
      this.staffsFilter = filterData;
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

  onChange(event: any){
    console.log(event);
    this.value = event.target.value.toLowerCase();
    
    this.staffsFilter = this.status === 0 ? this.staffs.filter(staff => staff.name.toLowerCase().includes(this.value) 
                || staff.email.toLowerCase().includes(this.value)) 
                : this.staffs.filter(staff => (staff.name.toLowerCase().includes(this.value) 
                || staff.email.toLowerCase().includes(this.value)) && this.status === 1 ? !staff.deleted : staff.deleted);
  }

}