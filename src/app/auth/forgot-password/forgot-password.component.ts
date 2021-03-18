import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
      this.forgotForm = new FormGroup({
      email: new FormControl('', Validators.required),
  });
  }

  forgot(){
    this.forgotForm.get('email').value;
    
    this.authService.forgotPassword(this.forgotForm.get('email').value).subscribe((success) =>{
        // this.router.navigateByUrl('/auth');
        this.toastr.success(success.mess);
    }, (error) => {
        this.toastr.error(error.error.mess);
    });
  }
}
