import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { FirebaseService } from './upload-file/firebase.service';

@NgModule({
  declarations: [
    PaginationComponent,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  exports: [
    UploadFileComponent
  ],
  providers: [],
})
export class SharedModule { }
