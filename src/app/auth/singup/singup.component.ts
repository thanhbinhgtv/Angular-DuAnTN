import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { SingupModel } from './singup-model';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  signupModel: SingupModel;   //Truyền dữ liệu qua biến này
  signupForm: FormGroup;  //Biến signForm có kiểu FormGroup (B1)

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { 
    this.signupModel = {
      name: '',
      email: '',
      phone: '',
      gender: null,
      pass: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({   //Validate, Viền đỏ khi emply (B1)
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      gender: new FormControl(true, Validators.required),
      password: new FormControl('', Validators.required),
      repassword: new FormControl('', Validators.required)
    });
  }

  signup(){
    if(this.signupForm.get('username').value == ""){
      this.toastr.error('Không để trống họ tên');
    }else if(this.signupForm.get('email').value == ""){
        this.toastr.error('Không để trống email');
    }else if(this.signupForm.get('password').value == ""){
        this.toastr.error('Mật khẩu phải trùng nhau');
    }else if(this.signupForm.get('password').value != this.signupForm.get('repassword').value){
        this.toastr.error('Mật khẩu phải trùng nhau');
    }else{
        this.signupModel.name = this.signupForm.get('username').value;
        this.signupModel.email = this.signupForm.get('email').value;
        this.signupModel.phone = this.signupForm.get('phone').value;
        this.signupModel.gender = this.signupForm.get('gender').value;
        this.signupModel.pass = this.signupForm.get('password').value;
    
        this.authService.signup(this.signupModel).subscribe(() => {
        this.router.navigate(['/auth'], { queryParams: { registered: 'true' } });
        this.toastr.success('Đăng ký tài khoản thành công')
        console.log('Đăng ký thành công');
        }, () => {
            this.toastr.error('Đăng ký thất bại! Vui lòng kiểm tra lại');
        });
    }
    
 }

 checkPassword(){
   if(this.signupForm.get('password').value != this.signupForm.get('repassword').value){
      console.log(false);
   }else {
     console.log(true);
   }
 };
}
