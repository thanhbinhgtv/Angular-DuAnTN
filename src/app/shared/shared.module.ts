import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ckeditor5Component } from './ckeditor5/ckeditor5.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    Ckeditor5Component,
    SlideshowComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule
  ],
  exports: [
    Ckeditor5Component,
    SlideshowComponent,
    ConfirmationDialogComponent
  ],
  providers: [],
})
export class SharedModule { }
