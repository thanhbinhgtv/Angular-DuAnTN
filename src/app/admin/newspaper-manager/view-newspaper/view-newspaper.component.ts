import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NewspaperService } from '../newspaper.service';
import { NewsPaperResponseModel } from '../../../shared/model/responses/newspaper-response-model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-newspaper',
  templateUrl: './view-newspaper.component.html',
  styleUrls: ['./view-newspaper.component.css']
})
export class ViewNewspaperComponent implements OnInit {
  news: Array<NewsPaperResponseModel> = [];
  // deleteSuccess : boolean;
  page = 0;
  hidden: string = '';
  search: string = '';
  searchForm = new FormControl('');
  hiddenForm = new FormControl('');

  constructor(private newspaperService: NewspaperService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllNewsPaper();
    
  }

  getAllNewsPaper(){
    this.newspaperService.getAllNewsPaper(this.hidden, this.search).subscribe(data =>{
      this.news = data;
    });
  }

  Search(){
    this.hidden = this.hiddenForm.value;
    this.search = this.searchForm.value;
    this.getAllNewsPaper();
  }

  // deleteNewpaper(id: number){
  //   this.newspaperService.deleteNewspaper(id).subscribe(() =>{
  //       this.toastr.success('Xóa thành công')
  //       this.deleteSuccess = true;
  //       if(this.deleteSuccess){
  //         this.getAllNewsPaper();
  //       }
  //     }, () => {
  //       this.toastr.error('Xóa thất bại! Vui lòng kiểm tra lại');
  //   });
  // }

}
