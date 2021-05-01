import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewsPaperPostRequestModel } from './newspaper-post-request';
import { NewspaperService } from '../newspaper.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FirebaseService } from 'src/app/shared/upload-file/firebase.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-newspaper',
  templateUrl: './create-newspaper.component.html',
  styleUrls: ['./create-newspaper.component.css']
})
export class CreateNewspaperComponent implements OnInit {
  public Editor = ClassicEditor;
  newsPaperForm : FormGroup;
  newpaperModel: NewsPaperPostRequestModel;
  accountId: number;
  selectedFile: File[] = null;
  urlFiles : "";

  constructor(private newspaperService: NewspaperService, private firebaseService: FirebaseService,
     private authService: AuthService, private router: Router, private toastr: ToastrService) { 
    this.accountId = this.authService.getId();
    
    this.newpaperModel = {
      staffId: 0,
      title: '',
      content: '',
      image: '',
    };
  }

  ngOnInit(): void {
    this.newsPaperForm = new FormGroup({
      staffId: new FormControl({value:"", disabled: true}, Validators.required),
      title: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(250)]),
      content: new FormControl("", [Validators.required, Validators.minLength(100)]),
      image: new FormControl("", Validators.required),
    });
    this.newsPaperForm.get('staffId').setValue(this.accountId);
  }

  createNewsPaper(){
    const fb = new FormData();
    for(var i=0; i<this.selectedFile.length; i++){
      fb.append('files', this.selectedFile[i]);
    }
    this.firebaseService.uploadFiles(fb).subscribe((data) => {
        this.urlFiles = data.join();
        this.uploadForm();
    }, (error) => {
      this.toastr.error(error.error.mess);
    });
  }

  uploadForm(){
        this.newpaperModel.staffId = this.newsPaperForm.get('staffId').value;
        this.newpaperModel.title = this.newsPaperForm.get('title').value;
        this.newpaperModel.content = this.newsPaperForm.get('content').value;
        this.newpaperModel.image = this.urlFiles;
        
        this.newspaperService.createNewpaper(this.newpaperModel).subscribe(() => {
            this.router.navigate(['/admin/newspaper'], { queryParams: { registered: 'true' } });
            this.toastr.success('Thành công')
        }, (error) => {
            this.toastr.error(error.error.mess);
        });
  }

  getFiles(event){
      this.selectedFile = event.target.files;
  }
}
