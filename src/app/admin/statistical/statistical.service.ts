import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRespone } from 'src/app/shared/model/responses/statistical/customer-response';
import { RevenueRespone } from 'src/app/shared/model/responses/statistical/revenue-response.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {

  constructor(private httpClient: HttpClient) { }

  getRevenue(page: number, year: number, month: number): Observable<RevenueRespone> {
    return this.httpClient.get<RevenueRespone>(`http://localhost:8080/super-admin/statistic/revenue?page=${page}&limit=5&year=${year?year:''}&month=${month?month:''}`);
  }

  getCustomer(page: number, year: number, month: number): Observable<CustomerRespone> {
    return this.httpClient.get<CustomerRespone>(`http://localhost:8080/super-admin/statistic/customer?page=${page}&limit=5&year=${year?year:''}&month=${month?month:''}`);
  }

  getArticle(page: number, year: number, month: number): Observable<CustomerRespone> {
    return this.httpClient.get<CustomerRespone>(`http://localhost:8080/super-admin/statistic/article?page=${page}&limit=5&year=${year?year:''}&month=${month?month:''}`);
  }

  getCountRequest(page: number, year: number, month: number): Observable<CustomerRespone> {
    return this.httpClient.get<CustomerRespone>(`http://localhost:8080/super-admin/statistic/count-request?page=${page}&limit=5&year=${year?year:''}&month=${month?month:''}`);
  }

  getStaffActive(page: number, year: number, month: number, date: number, search: string): Observable<CustomerRespone> {
    return this.httpClient.get<CustomerRespone>
    (`http://localhost:8080/super-admin/statistic/staff-action?page=${page}&limit=5&year=${year?year:''}&month=${month?month:''}&date=${date?date:''}&search=${search?search:''}`);
  }
}
