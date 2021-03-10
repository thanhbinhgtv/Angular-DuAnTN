import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/admin/shared/header/header.component';
import { FooterComponent } from './components/admin/shared/footer/footer.component';
import { SlidebarComponent } from './components/admin/shared/slidebar/slidebar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { ViewStaffComponent } from './components/admin/staff-manager/view-staff/view-staff.component';
import { CreateStaffComponent } from './components/admin/staff-manager/create-staff/create-staff.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SlidebarComponent,
    LoginComponent,
    SingupComponent,
    ViewStaffComponent,
    CreateStaffComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
