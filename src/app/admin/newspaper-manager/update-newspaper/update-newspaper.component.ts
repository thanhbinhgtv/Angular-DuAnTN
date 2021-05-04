import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FirebaseService } from 'src/app/shared/upload-file/firebase.service';
import { NewsPaperPostRequestModel } from '../create-newspaper/newspaper-post-request';
import { NewspaperService } from '../newspaper.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-update-newspaper',
  templateUrl: './update-newspaper.component.html',
  styleUrls: ['./update-newspaper.component.css']
})
export class UpdateNewspaperComponent implements OnInit {
  public Editor = ClassicEditor;
  newsPaperForm: FormGroup;
  newPaperId: number
  newpaperModel: NewsPaperPostRequestModel;
  accountId: number;
  selectedFile: File[] = null;
  urlFiles : "";
  srcImg: string;
  
  constructor( private newspaperService: NewspaperService, private firebaseService: FirebaseService, private authService: AuthService,
     private activateRoute: ActivatedRoute, private router: Router, private toastr: ToastrService, private dialog: MatDialog) { 
    this.newPaperId = this.activateRoute.snapshot.params.id;
    this.accountId = this.authService.getId();
    
    this.newpaperModel = {
      staffId: 0,
      title: '',
      content: '',
      image: '',
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
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent);
      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
      const fb = new FormData();
      for(var i=0; i<this.selectedFile.length; i++){
          fb.append('files', this.selectedFile[i]);
      }
      this.firebaseService.uploadFiles(fb).subscribe((data) => {
          console.log(data);
          this.urlFiles = data.join();
          this.uploadForm();
      }, (error) => {
          this.toastr.error(error.error.mess);
      });
    }
  });
  }

  uploadForm(){
      this.newpaperModel.staffId = this.newsPaperForm.get('staffId').value;
      this.newpaperModel.title = this.newsPaperForm.get('title').value;
      this.newpaperModel.content = this.newsPaperForm.get('content').value;
      this.newpaperModel.image = this.urlFiles;

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
        this.srcImg = data.image;
        console.log(this.srcImg);
        
    })
  }

  getFiles(event){
    this.selectedFile = event.target.files;
  }
}
