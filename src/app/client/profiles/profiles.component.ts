import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles',
  template: `
    <!-- <app-header></app-header> -->
    <!-- <app-sidebar></app-sidebar> -->
    <router-outlet></router-outlet>
    <!-- <app-footer></app-footer> -->
  `,
})
export class ProfilesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
