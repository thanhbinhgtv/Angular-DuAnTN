import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NewspaperService } from '../newspaper.service';
import { NewsPaperResponseModel } from './newspaper-response-model';

@Component({
  selector: 'app-view-newspaper',
  templateUrl: './view-newspaper.component.html',
  styleUrls: ['./view-newspaper.component.css']
})
export class ViewNewspaperComponent implements OnInit {
  news: Array<NewsPaperResponseModel> = [];
  page = 0;

  constructor(private newspaperService: NewspaperService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllNewsPaper();
  }

  getAllNewsPaper(){
    this.newspaperService.getAllNewsPaper(this.page).subscribe(news =>{
      this.news = news;
    });
  }
}
