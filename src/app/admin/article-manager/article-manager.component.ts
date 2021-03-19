import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-manager',
  template: `<router-outlet></router-outlet>`,
})
export class ArticleManagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
