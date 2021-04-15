import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { Ckeditor5Component } from './ckeditor5/ckeditor5.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    PaginationComponent,
    Ckeditor5Component,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
  ],
  exports: [
    Ckeditor5Component,
  ],
  providers: [],
})
export class SharedModule { }
