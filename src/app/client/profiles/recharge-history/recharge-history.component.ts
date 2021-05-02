import { Component, OnInit } from '@angular/core';
import { TransactionResponseModel } from 'src/app/shared/model/responses/transaction.response.model';
import { PaypalService } from '../../service/paypal.service';

@Component({
  selector: 'app-recharge-history',
  templateUrl: './recharge-history.component.html',
  styleUrls: ['./recharge-history.component.css']
})
export class RechargeHistoryComponent implements OnInit {
  rechargeHistory: Array<TransactionResponseModel> = [];
  page = 0;
  arrayPage = new Array();
  numberPage: number;

  constructor(private paypal: PaypalService) { }

  ngOnInit(): void {
      this.getTransaction();
  }

  getTransaction(){
      this.paypal.getTransaction1(this.page).subscribe(data => {
          this.rechargeHistory = data;

          this.numberPage = data[0].pages;
          this.arrayPage = Array(this.numberPage).fill(0).map((x,i)=>i);
      })
  }

  onPage(page: number) {
    this.page = page;
    this.getTransaction();
  }
}
