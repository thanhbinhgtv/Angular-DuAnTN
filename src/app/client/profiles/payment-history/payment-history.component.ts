import { Component, OnInit } from '@angular/core';
import { TransactionResponseModel } from 'src/app/shared/model/responses/transaction.response.model';
import { PaypalService } from '../../service/paypal.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  paymentHistory: Array<TransactionResponseModel> = [];
  page = 0;
  arrayPage = new Array();
  numberPage: number;

  constructor(private paypal: PaypalService) { }

  ngOnInit(): void {
      this.getTransaction();
  }

  getTransaction(){
      this.paypal.getTransaction2(this.page).subscribe(data => {
          this.paymentHistory = data;
        
          this.numberPage = data[0].pages;
          this.arrayPage = Array(this.numberPage).fill(0).map((x,i)=>i);
      })
  }

  onPage(page: number) {
    this.page = page;
    this.getTransaction();
  }
}
