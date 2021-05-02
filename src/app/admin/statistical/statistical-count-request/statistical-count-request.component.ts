import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  constructor(private statisticalService: StatisticalService) { }

  ngOnInit(): void {
    this.getCountRequest();
  }

  getCountRequest(){
    this.statisticalService.getCountRequest(this.page, this.year.value, this.month.value).subscribe((data) => {
      this.countRequest = data;
      console.log(this.countRequest);
    })
  }

  Search(){
    this.getCountRequest();
  }

}
