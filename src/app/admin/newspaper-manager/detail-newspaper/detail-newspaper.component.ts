import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewspaperService } from '../newspaper.service';

@Component({
  selector: 'app-detail-newspaper',
  templateUrl: './detail-newspaper.component.html',
  styleUrls: ['./detail-newspaper.component.css']
})
export class DetailNewspaperComponent implements OnInit {
  newsPaperForm: FormGroup;
  newPaperId: number
  
  constructor( private newspaperService: NewspaperService, private activateRoute: ActivatedRoute) { 
    this.newPaperId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getStaffById();

    this.newsPaperForm = new FormGroup({
      newId: new FormControl({value:"", disabled:true}),
      title: new FormControl({value:"", disabled:true}),
      content: new FormControl({value:"", disabled:true}),
      author: new FormControl({value:"", disabled:true}),
      // image: new FormControl("", [Validators.required, Validators.minLength(9)]),
    });
  }

  getStaffById(){
    this.newspaperService.getNewpaperById(this.newPaperId).subscribe((data) => {
        this.newsPaperForm.patchValue(data);
    })
  }
}
