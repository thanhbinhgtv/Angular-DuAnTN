import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ckeditor5Component } from './ckeditor5/ckeditor5.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Ckeditor5Component,
    SlideshowComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [
    Ckeditor5Component,
    SlideshowComponent,
  ],
  providers: [],
})
export class SharedModule { }
