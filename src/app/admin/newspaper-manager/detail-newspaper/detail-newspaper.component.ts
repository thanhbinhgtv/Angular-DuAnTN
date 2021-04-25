import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewspaperService } from '../newspaper.service';
import { NewsPaperResponseModel } from '../../../shared/model/responses/newspaper-response-model';

@Component({
  selector: 'app-detail-newspaper',
  templateUrl: './detail-newspaper.component.html',
  styleUrls: ['./detail-newspaper.component.css']
})
export class DetailNewspaperComponent implements OnInit {
  newsPaperForm: FormGroup;
  newPaperId: number
  news : NewsPaperResponseModel;

  constructor( private newspaperService: NewspaperService, private activateRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { 
    this.newPaperId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getNewpaperById();

    this.newsPaperForm = new FormGroup({
      newId: new FormControl({value:"", disabled:true}),
      title: new FormControl({value:"", disabled:true}),
      content: new FormControl({value:"", disabled:true}),
      author: new FormControl({value:"", disabled:true}),
      // image: new FormControl("", [Validators.required, Validators.minLength(9)]),
    });
  }

  getNewpaperById(){
    this.newspaperService.getNewpaperById(this.newPaperId).subscribe((data) => {
        this.newsPaperForm.patchValue(data);
        this.news = data;
    })
  }

  activeNews(){
    this.newspaperService.getActiveNewsPaper(this.newPaperId).subscribe((data) => {
      this.toastr.success(data.mess);
      this.router.navigate(['/admin/newspaper']);
    }, error =>{
        this.toastr.error(error.error.mess);
    });
  }

  hiddenNews(){
    this.newspaperService.getHiddenNewsPaper(this.newPaperId).subscribe((data) => {
      this.toastr.success(data.mess);
      this.router.navigate(['/admin/newspaper']);
    }, error =>{
        this.toastr.error(error.error.mess);
    });
  }
}
