import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LoginModel } from './login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginModel: LoginModel;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { 
      this.loginModel = {
        email: '',
        pass: ''
      };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
  });

  // this.activatedRoute.queryParams
  //     .subscribe(params => {
  //       if (params.registered !== undefined && params.registered === 'true') {
  //         this.toastr.success('Signup Successful');
  //         this.registerSuccessMessage = 'Please Check your inbox for activation email '
  //           + 'activate your account before you Login!';
  //       }
  //     });
  }

  login(){
    this.loginModel.email = this.loginForm.get('email').value;
    this.loginModel.pass = this.loginForm.get('password').value;
    
    this.authService.login(this.loginModel).subscribe(() =>{
        this.isError = false;
        this.router.navigateByUrl('/admin');
        this.toastr.success('Đăng nhập thành công');
    }, error => {
        this.isError = true;
        this.toastr.error("Đăng nhập thất bại! Kiểm tra lại thông tin đăng nhập");
        throwError(error)
    });
}

}
