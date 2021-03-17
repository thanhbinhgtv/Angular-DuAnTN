import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffsModel } from './view-staff/staffs-model';

@Injectable({
  providedIn: 'root'
})
export class StaffsService {

  constructor(private http: HttpClient) { }

  getAllStaffs(): Observable<Array<StaffsModel>> {
    return this.http.get<Array<StaffsModel>>('http://localhost:8080/super-admin/staffs');
  }
}
