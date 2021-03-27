import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-admin',
  template: `
      <div id="wrapper">
        
          <!-- Sidebar -->
          <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
              <!-- Sidebar - Brand -->
              <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                  <div class="sidebar-brand-icon">
                     <i class="fas fa-home"></i>
                  </div>
                  <div class="sidebar-brand-text mx-3">Thanh Xuân</div>
              </a>
              <!-- Divider -->
              <hr class="sidebar-divider my-0">
              <!-- Nav Item - Dashboard -->
              <li class="nav-item active">
                  <a class="nav-link" href="index.html">
                      <i class="fas fa-fw fa-tachometer-alt"></i>
                      <span>Bảng Cá Nhân</span></a>
              </li>
              <!-- Divider -->
              <hr class="sidebar-divider">
              <!-- Heading -->
              <div class="sidebar-heading">
                  Interface
              </div>
              <!-- Nav Item - Pages Collapse Menu -->
              <li class="nav-item">
                  <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                      aria-expanded="true" aria-controls="collapseTwo">
                      <i class="fas fa-fw fa-cog"></i>
                      <span>Thành Phần</span>
                  </a>
                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                      <div class="bg-white py-2 collapse-inner rounded">
                          <h6 class="collapse-header">Custom Components:</h6>
                          <a class="collapse-item" href="buttons.html">Buttons</a>
                          <a class="collapse-item" href="cards.html">Cards</a>
                      </div>
                  </div>
              </li>
              <!-- Nav Item - Utilities Collapse Menu -->
              <li class="nav-item">
                  <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                      aria-expanded="true" aria-controls="collapseUtilities">
                      <i class="fas fa-fw fa-wrench"></i>
                      <span>Tiện ích</span>
                  </a>
                  <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                      data-parent="#accordionSidebar">
                      <div class="bg-white py-2 collapse-inner rounded">
                          <h6 class="collapse-header">Custom Utilities:</h6>
                          <a class="collapse-item" href="utilities-color.html">Colors</a>
                          <a class="collapse-item" href="utilities-border.html">Borders</a>
                          <a class="collapse-item" href="utilities-animation.html">Animations</a>
                          <a class="collapse-item" href="utilities-other.html">Other</a>
                      </div>
                  </div>
              </li>
              <!-- Divider -->
              <hr class="sidebar-divider">
              <!-- Heading -->
              <div class="sidebar-heading">
                  Chức Năng Chính
              </div>
              <!-- Nav Item - Pages Collapse Menu -->
              <li class="nav-item">
                  <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                      aria-expanded="true" aria-controls="collapsePages">
                      <i class="fas fa-fw fa-folder"></i>
                      <span>Quản Lý</span>
                  </a>
                  <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                      <div class="bg-white py-2 collapse-inner rounded">
                          <h6 class="collapse-header">Danh Sách:</h6>
                          <a class="collapse-item" routerLink="/admin/staff">Nhân Viên</a>
                          <a class="collapse-item" routerLink="/admin/article">Bài Đăng</a>
                          <a class="collapse-item" routerLink="/admin/newspaper">Tin Tức</a>
                          <a class="collapse-item" routerLink="/admin/customer">Khách Hàng</a>
                          <div class="collapse-divider"></div>
                          <h6 class="collapse-header">Other Pages:</h6>
                          <a class="collapse-item" href="404.html">404 Page</a>
                          <a class="collapse-item" href="blank.html">Blank Page</a>
                      </div>
                  </div>
              </li>
              <li class="nav-item">
                  <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAuth"
                      aria-expanded="true" aria-controls="collapsePages">
                      <i class="fas fa-fw fa-folder"></i>
                      <span>Tài Khoản</span>
                  </a>
                  <div id="collapseAuth" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                      <div class="bg-white py-2 collapse-inner rounded">
                          <h6 class="collapse-header">Tài Khoản:</h6>
                          <a class="collapse-item" routerLink="/auth/login" *ngIf="!isLoggedIn">Đăng Nhập</a>
                          <a class="collapse-item" routerLink="/auth/login" *ngIf="isLoggedIn">Đăng Xuất</a>
                          <a class="collapse-item" routerLink="/auth/signup">Đăng Ký</a>
                          <a class="collapse-item" routerLink="/auth/forgot-password">Quên Mật Khẩu</a>
                          <div class="collapse-divider"></div>
                          <h6 class="collapse-header">Other Pages:</h6>
                          <a class="collapse-item" href="404.html">404 Page</a>
                          <a class="collapse-item" href="blank.html">Blank Page</a>
                      </div>
                  </div>
              </li>
              <li class="nav-item">
                  <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseStatistical"
                      aria-expanded="true" aria-controls="collapsePages">
                      <i class="fas fa-fw fa-folder"></i>
                      <span>Thống Kê</span>
                  </a>
                  <div id="collapseStatistical" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                      <div class="bg-white py-2 collapse-inner rounded">
                          <h6 class="collapse-header">Thống Kê:</h6>
                          <a class="collapse-item" href="login.html">Doanh Thu</a>
                          <a class="collapse-item" href="register.html">Khách Hàng</a>
                          <a class="collapse-item" href="forgot-password.html">Bài Đăng</a>
                          <div class="collapse-divider"></div>
                          <h6 class="collapse-header">Other Pages:</h6>
                          <a class="collapse-item" href="404.html">404 Page</a>
                          <a class="collapse-item" href="blank.html">Blank Page</a>
                      </div>
                  </div>
              </li>
              <!-- Nav Item - Charts -->
              <li class="nav-item">
                  <a class="nav-link" href="charts.html">
                      <i class="fas fa-fw fa-chart-area"></i>
                      <span>Charts</span></a>
              </li>
              <!-- Nav Item - Tables -->
              <li class="nav-item">
                  <a class="nav-link" href="tables.html">
                      <i class="fas fa-fw fa-table"></i>
                      <span>Tables</span></a>
              </li>
              <!-- Divider -->
              <hr class="sidebar-divider d-none d-md-block">
              <!-- Sidebar Toggler (Sidebar) -->
              <!-- Sidebar Message -->
              <div class="sidebar-card" [ngStyle]="{'background-color':'#313D60'}">
                  <img class="sidebar-card-illustration mb-2" src="assets/img/icon-house.png" alt="" [ngStyle]="{'height': '80px'}">
                <a class="btn btn-secondary btn-sm" href="#" [ngStyle]="{'background-color':'#37446B'}">Trang Chủ</a>
              </div>
          </ul>
          <!-- End of Sidebar -->
          
          <div id="content-wrapper" class="d-flex flex-column">
              <div id="content">
                  <app-header></app-header>
                  <router-outlet></router-outlet>
              </div>
              <app-footer></app-footer>
          </div>
      </div>
      <app-modal-logout></app-modal-logout>
  `,
})
export class AdminComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
