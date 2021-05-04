import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerRespone } from 'src/app/shared/model/responses/statistical/customer-response';
import { StatisticalService } from '../statistical.service';

@Component({
  selector: 'app-statistical-count-request',
  templateUrl: './statistical-count-request.component.html',
  styleUrls: ['./statistical-count-request.component.css']
})
export class StatisticalCountRequestComponent implements OnInit {
  countRequest : CustomerRespone;
  page: number = 0;
  year = new FormControl('');
  month = new FormControl('');

  constructor(private statisticalService: StatisticalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCountRequest();
  }

  getCountRequest(){
    this.statisticalService.getCountRequest(this.page, this.year.value, this.month.value).subscribe((data) => {
      this.countRequest = data;
      console.log(this.countRequest);
    },error =>{
      this.toastr.error(error.error.mess)
    })
  }

  Search(){
    this.getCountRequest();
  }

}
