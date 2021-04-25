import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CustomerService } from 'src/app/client/service/customer.service';
import { CustomerResponseModel } from 'src/app/shared/model/responses/customer-reponse-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  customerModel: CustomerResponseModel;
  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService, private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomerProfile();
    
    // Value tức thì khi login
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    // Giữ value khi load lại (value in local)
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('auth');
  }

  getCustomerProfile(){
    this.customerService.getCustomerProfile().subscribe((data) => {
      this.customerModel = data;
    })
  }

}
