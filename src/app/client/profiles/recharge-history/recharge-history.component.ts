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

  constructor(private paypal: PaypalService) { }

  ngOnInit(): void {
      this.getTransaction();
  }

  getTransaction(){
      this.paypal.getTransaction(this.page).subscribe(data => {
          this.rechargeHistory = data;
      })
  }
}
