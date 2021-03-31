import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NewsPaperPostRequestModel } from '../create-newspaper/newspaper-post-request';
import { NewspaperService } from '../newspaper.service';

@Component({
  selector: 'app-update-newspaper',
  templateUrl: './update-newspaper.component.html',
  styleUrls: ['./update-newspaper.component.css']
})
export class UpdateNewspaperComponent implements OnInit {
  newsPaperForm: FormGroup;
  newPaperId: number
  newpaperModel: NewsPaperPostRequestModel;
  accountId: number;
  
  constructor( private newspaperService: NewspaperService, private authService: AuthService, private activateRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { 
    this.newPaperId = this.activateRoute.snapshot.params.id;
    this.accountId = this.authService.getId();
    
    this.newpaperModel = {
      staffId: 0,
      title: '',
      content: '',
      image: 'img/binh.jpg',
    };
  }

  ngOnInit(): void {
    this.getStaffById();

    this.newsPaperForm = new FormGroup({
      staffId: new FormControl({value: "", disabled:true}, Validators.required),
      title: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(250)]),
      content: new FormControl("", [Validators.required, Validators.minLength(100)]),
      // image: new FormControl("", [Validators.required, Validators.minLength(9)]),
    });
    this.newsPaperForm.get('staffId').setValue(this.accountId);
  }

  updateNewsPaper(){
    this.newpaperModel.staffId = this.newsPaperForm.get('staffId').value;
    this.newpaperModel.title = this.newsPaperForm.get('title').value;
    this.newpaperModel.content = this.newsPaperForm.get('content').value;
    
    this.newspaperService.updateNewspaper(this.newPaperId, this.newpaperModel).subscribe(() => {
      this.router.navigate(['/admin/newspaper'], { queryParams: { registered: 'true' } });
      this.toastr.success('Thành công')
      }, (error) => {
        this.toastr.error(error.error.mess);
    });
  }

  getStaffById(){
    this.newspaperService.getNewpaperById(this.newPaperId).subscribe((data) => {
        this.newsPaperForm.patchValue(data);
    })
  }
}
