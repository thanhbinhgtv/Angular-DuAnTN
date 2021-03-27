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
  messNumber : number;

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
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('', [Validators.required])
    });
  }

  signup(){
      if(this.signupForm.get('username').errors?.required){
        this.messNumber = 1;
      }else if(this.signupForm.get('username').errors?.minlength){
        this.messNumber = 2;
      }else if(this.signupForm.get('email').errors?.required){
        this.messNumber = 3;
      }else if(this.signupForm.get('email').errors?.email){
        this.messNumber = 4;
      }else if(this.signupForm.get('phone').errors?.required){
        this.messNumber = 5;
      }else if(this.signupForm.get('phone').errors?.minlength){
        this.messNumber = 6;
      }else if(this.signupForm.get('gender').errors?.required){
        this.messNumber = 7;
      }else if(this.signupForm.get('password').errors?.required){
        this.messNumber = 8;
      }else if(this.signupForm.get('password').errors?.minlength){
        this.messNumber = 9;
      }else if(this.signupForm.get('repassword').errors?.required){
        this.messNumber = 10;
      }else if(this.signupForm.get('repassword').value != this.signupForm.get('password').value){
        this.messNumber = 11;
      }else{
        this.messNumber = 12;
        this.signupModel.name = this.signupForm.get('username').value;
        this.signupModel.email = this.signupForm.get('email').value;
        this.signupModel.phone = this.signupForm.get('phone').value;
        this.signupModel.gender = this.signupForm.get('gender').value;
        this.signupModel.pass = this.signupForm.get('password').value;
    
        this.authService.signup(this.signupModel).subscribe(() => {
        this.router.navigate(['/auth'], { queryParams: { registered: 'true' } });
        this.toastr.success('Đăng ký tài khoản thành công, Vui lòng kích hoạt tài khoản qua email')
        }, () => {
            this.toastr.error('Đăng ký thất bại! Vui lòng kiểm tra lại');
        });
      }
   }

}
