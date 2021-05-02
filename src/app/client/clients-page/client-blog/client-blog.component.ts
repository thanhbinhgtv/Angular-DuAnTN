import { Component, OnInit } from '@angular/core';
import { NewsPaperResponseModel } from 'src/app/shared/model/responses/newspaper-response-model';
import { NewpaperService } from '../../service/newpaper.service';

@Component({
  selector: 'app-client-block',
  templateUrl: './client-blog.component.html',
  styleUrls: ['./client-blog.component.css']
})
export class ClientBlogComponent implements OnInit {
  newpapers : Array<NewsPaperResponseModel> = [];
  page = 0;
  arrayPage = new Array();
  numberPage: number;

  constructor(private newpaperService: NewpaperService) { }

  ngOnInit(): void {
    this.getAllNewpaperNoLogin();
  }

  getAllNewpaperNoLogin(){
    this.newpaperService.getAllNewpaperNoLogin(this.page).subscribe(data => {
        this.newpapers = data;

        this.numberPage = data[0].pages;
        this.arrayPage = Array(this.numberPage).fill(0).map((x,i)=>i);
    })
  }

  onPage(page: number) {
    this.page = page;
    this.getAllNewpaperNoLogin();
  }

}
