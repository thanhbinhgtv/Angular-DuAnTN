import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  @Input() images = [];
  @Input() length = Number;
 
  constructor() { }

  ngOnInit(): void {
  }

}
