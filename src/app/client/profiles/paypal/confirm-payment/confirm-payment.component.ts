import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.css']
})
export class ConfirmPaymentComponent implements OnInit {
  usd : number;
  vnd : number;

  constructor(private router: Router, private toastr: ToastrService, private activateRoute: ActivatedRoute) { 
    this.activateRoute.queryParams.subscribe(params => {
      this.usd = params['usd'];
      this.vnd = params['vnd'];
    });
  }
  
  ngOnInit(): void {
    console.log(this.usd);
  }

}
