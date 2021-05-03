import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RevenueRespone } from 'src/app/shared/model/responses/statistical/revenue-response.model';
import { StatisticalService } from '../statistical.service';

@Component({
  selector: 'app-statistical-revenue',
  templateUrl: './statistical-revenue.component.html',
  styleUrls: ['./statistical-revenue.component.css']
})
export class StatisticalRevenueComponent implements OnInit {
  revenue : RevenueRespone;
  page: number = 0;
  year = new FormControl('');
  month = new FormControl('');

  constructor(private statisticalService: StatisticalService) { }

  ngOnInit(): void {
      this.getRevenue();
  }

  getRevenue(){
      this.statisticalService.getRevenue(this.page, this.year.value, this.month.value).subscribe((data) => {
        this.revenue = data;
        console.log(this.revenue);
      })
  }

  Search(){
      this.getRevenue();
  }
}
