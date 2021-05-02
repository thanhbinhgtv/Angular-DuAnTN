import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerRespone } from 'src/app/shared/model/responses/statistical/customer-response';
import { StatisticalService } from '../statistical.service';

@Component({
  selector: 'app-statistical-customer',
  templateUrl: './statistical-customer.component.html',
  styleUrls: ['./statistical-customer.component.css']
})
export class StatisticalCustomerComponent implements OnInit {
  customer : CustomerRespone;
  page: number = 0;
  year = new FormControl('');
  month = new FormControl('');

  constructor(private statisticalService: StatisticalService) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(){
    this.statisticalService.getCustomer(this.page, this.year.value, this.month.value).subscribe((data) => {
      this.customer = data;
      console.log(this.customer);
    })
  }

  Search(){
    this.getCustomer();
  }

}
