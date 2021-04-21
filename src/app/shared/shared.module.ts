import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { Ckeditor5Component } from './ckeditor5/ckeditor5.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PaginationComponent,
    Ckeditor5Component,
    SlideshowComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    NgbModule,
  ],
  exports: [
    Ckeditor5Component,
    SlideshowComponent,
  ],
  providers: [],
})
export class SharedModule { }
