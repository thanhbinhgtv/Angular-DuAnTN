import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { Ckeditor5Component } from './ckeditor5/ckeditor5.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    PaginationComponent,
    UploadFileComponent,
    Ckeditor5Component,
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFirestoreModule,
    AngularFireStorageModule,
    CKEditorModule,
  ],
  exports: [
    UploadFileComponent,
    Ckeditor5Component,
  ],
  providers: [],
})
export class SharedModule { }
