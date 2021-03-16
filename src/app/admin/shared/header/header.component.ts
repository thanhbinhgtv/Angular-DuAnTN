import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
     // Value tức thì khi login
     this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
     this.authService.username.subscribe((data: string) => this.username = data);
     // Giữ value khi load lại (value in local)
     this.isLoggedIn = this.authService.isLoggedIn();
     this.username = this.authService.getUserName();
  }

}
