import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewsPaperPostRequestModel } from './newspaper-post-request';
import { NewspaperService } from '../newspaper.service';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-create-newspaper',
  templateUrl: './create-newspaper.component.html',
  styleUrls: ['./create-newspaper.component.css']
})
export class CreateNewspaperComponent implements OnInit {
  newsPaperForm : FormGroup;
  newpaperModel: NewsPaperPostRequestModel;
  accountId: number;

  constructor(private newspaperService: NewspaperService, private authService: AuthService, private router: Router, private toastr: ToastrService) { 
    this.accountId = this.authService.getId();
    
    this.newpaperModel = {
      staffId: 0,
      title: '',
      content: '',
      image: 'img/binh.jpg',
    };
  }

  ngOnInit(): void {
    this.newsPaperForm = new FormGroup({
      staffId: new FormControl({value:"", disabled: true}, Validators.required),
      title: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(250)]),
      content: new FormControl("", [Validators.required, Validators.minLength(100)]),
      // image: new FormControl("", [Validators.required, Validators.minLength(9)]),
    });
    this.newsPaperForm.get('staffId').setValue(this.accountId);
  }

  createNewsPaper(){
    this.newpaperModel.staffId = this.newsPaperForm.get('staffId').value;
    this.newpaperModel.title = this.newsPaperForm.get('title').value;
    this.newpaperModel.content = this.newsPaperForm.get('content').value;
    
    this.newspaperService.createNewpaper(this.newpaperModel).subscribe(() => {
      this.router.navigate(['/admin/newspaper'], { queryParams: { registered: 'true' } });
      this.toastr.success('Thành công')
      }, (error) => {
        this.toastr.error(error.error.mess);
    });
  }
}
