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
  messNumber : number;
  registerSuccessMessage: string;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { 
      this.loginModel = {
        email: '',
        pass: ''
      };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
    if(this.loginForm.get('email').errors?.required){
      this.messNumber = 1;
    }else if(this.loginForm.get('email').errors?.email){
      this.messNumber = 2;
    }else if(this.loginForm.get('password').errors?.required){
      this.messNumber = 3;
    }else if(this.loginForm.get('password').errors?.minlength){
      this.messNumber = 4;
    }else{
      this.loginModel.email = this.loginForm.get('email').value;
      this.loginModel.pass = this.loginForm.get('password').value;
      
      this.authService.login(this.loginModel).subscribe(() =>{
        const isRoles = this.authService.getRole();
        if (isRoles == "ADMIN" || isRoles == "SUPER_ADMIN") {
          this.router.navigateByUrl('/admin');
        } else {
            this.router.navigateByUrl('/client/home');
        }
          this.toastr.success('Đăng nhập thành công');
      }, (error) => {
          this.toastr.error(error.error.mess);
          // throwError(error.error.pass);
      });
    }
  }

}
