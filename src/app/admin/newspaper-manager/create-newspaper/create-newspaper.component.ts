import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewsPaperPostRequestModel } from './newspaper-post-request';
import { NewspaperService } from '../newspaper.service';

@Component({
  selector: 'app-create-newspaper',
  templateUrl: './create-newspaper.component.html',
  styleUrls: ['./create-newspaper.component.css']
})
export class CreateNewspaperComponent implements OnInit {
  newsPaperForm : FormGroup;
  newpaperModel: NewsPaperPostRequestModel;

  constructor(private newspaperService: NewspaperService, private router: Router, private toastr: ToastrService) { 
    this.newpaperModel = {
      staffId: 0,
      title: '',
      content: '',
      image: 'img/binh.jpg',
    };
  }

  ngOnInit(): void {
    this.newsPaperForm = new FormGroup({
      staffId: new FormControl("", Validators.required),
      title: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(250)]),
      content: new FormControl("", [Validators.required, Validators.minLength(100)]),
      // image: new FormControl("", [Validators.required, Validators.minLength(9)]),
    });
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
