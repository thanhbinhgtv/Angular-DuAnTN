import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsPaperResponseModel } from 'src/app/shared/model/responses/newspaper-response-model';
import { NewpaperService } from '../../service/newpaper.service';

@Component({
  selector: 'app-detail-newpaper',
  templateUrl: './detail-newpaper.component.html',
  styleUrls: ['./detail-newpaper.component.css']
})
export class DetailNewpaperComponent implements OnInit {
  newPaperId: number
  new : NewsPaperResponseModel;

  constructor(private newspaperService: NewpaperService, private activateRoute: ActivatedRoute) { 
      this.newPaperId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getNewpaperById();
  }

  getNewpaperById(){
    this.newspaperService.getNewpaperByIdNoLogin(this.newPaperId).subscribe((data) => {
        this.new = data;
    })
  }

}
