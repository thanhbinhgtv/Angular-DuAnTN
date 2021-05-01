import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ckeditor5',
  templateUrl: './ckeditor5.component.html',
  styleUrls: ['./ckeditor5.component.css']
})
export class Ckeditor5Component implements OnInit {
  public Editor = ClassicEditor;
  templateForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.templateForm = new FormGroup({
      body: new FormControl(""),
    })
  }

}
