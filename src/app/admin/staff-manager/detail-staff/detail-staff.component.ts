import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { StaffsService } from '../staffs.service';
import { StaffResponseModel } from '../view-staff/staff-response-model';

@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.component.html',
  styleUrls: ['./detail-staff.component.css']
})
export class DetailStaffComponent implements OnInit {
  staff: StaffResponseModel;
  staffId: number;

  constructor(private staffService: StaffsService, private activateRoute: ActivatedRoute, private router: Router,
     private toastr: ToastrService, private dialog: MatDialog) { 
    this.staffId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getStaffById();
  }

  getStaffById(){
    this.staffService.getStaffsById(this.staffId).subscribe((data) => {
        this.staff = data;
    });
  }

  activeStaff(){
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent);
      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
    this.staffService.getActiveStaff(this.staffId).subscribe((data) => {
      this.toastr.success(data.mess);
      this.router.navigate(['/admin/staff']);
    }, error =>{
        this.toastr.error(error.error.mess);
    });
    }
  });
  }

  blockStaff(){
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent);
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
    this.staffService.getBlockStaff(this.staffId).subscribe(() => {
      this.toastr.success("Khóa nhân viên thành công");
      this.router.navigate(['/admin/staff']);
    }, error =>{
        this.toastr.error(error.error.mess);
    });
      }
    });
  }
  
}
