import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients-page',
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
  `,
})
export class ClientsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
