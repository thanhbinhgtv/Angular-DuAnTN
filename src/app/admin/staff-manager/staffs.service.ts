import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffRequestModel } from './create-staff/staff-request-model';
import { StaffUpdateRequestModel } from './update-staff/staff-update-request-model';
import { StaffResponseModel } from './view-staff/staff-response-model';

@Injectable({
  providedIn: 'root'
})
export class StaffsService {

  constructor(private http: HttpClient) { }

  getAllStaffs(page: number, block: string): Observable<Array<StaffResponseModel>> {
    return this.http.get<Array<StaffResponseModel>>(`http://localhost:8080/super-admin/staffs?page=${page}&&limit=10&&block=${block?block:''}`);
  }

  getStaffsById(id: number): Observable<StaffResponseModel> {
    return this.http.get<StaffResponseModel>('http://localhost:8080/super-admin/staffs/' +id);
  }

  createStaff(postStaffModel: StaffRequestModel): Observable<any>{
    return this.http.post('http://localhost:8080/super-admin/staffs', postStaffModel);
  }

  updateStaff(id: number, updateStaffModel: StaffUpdateRequestModel): Observable<any>{
    return this.http.put('http://localhost:8080/super-admin/staffs/'+id, updateStaffModel);
  }
  
  deleteStaff(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/super-admin/staffs/' + id);
  }
  
  getActiveStaff(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/super-admin/staffs/active/${id}`);
  }

  getBlockStaff(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/super-admin/staffs/block/${id}`);
  }
}
