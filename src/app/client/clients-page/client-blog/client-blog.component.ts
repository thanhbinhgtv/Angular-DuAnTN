import { Component, OnInit } from '@angular/core';
import { NewsPaperResponseModel } from 'src/app/shared/model/responses/newspaper-response-model';
import { NewpaperService } from '../../service/newpaper.service';

@Component({
  selector: 'app-client-block',
  templateUrl: './client-blog.component.html',
  styleUrls: ['./client-blog.component.css']
})
export class ClientBlogComponent implements OnInit {
  page = 0;
  newpapers : Array<NewsPaperResponseModel> = [];

  constructor(private newpaperService: NewpaperService) { }

  ngOnInit(): void {
    this.getAllNewpaperNoLogin();
  }

  getAllNewpaperNoLogin(){
    this.newpaperService.getAllNewpaperNoLogin(this.page).subscribe(data => {
        this.newpapers = data;
    })
  }

}
