import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerRespone } from 'src/app/shared/model/responses/statistical/customer-response';
import { StatisticalService } from '../statistical.service';

@Component({
  selector: 'app-statistical-article',
  templateUrl: './statistical-article.component.html',
  styleUrls: ['./statistical-article.component.css']
})
export class StatisticalArticleComponent implements OnInit {
  article : CustomerRespone;
  page: number = 0;
  year = new FormControl('');
  month = new FormControl('');

  constructor(private statisticalService: StatisticalService) { }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(){
    this.statisticalService.getArticle(this.page, this.year.value, this.month.value).subscribe((data) => {
      this.article = data;
      console.log(this.article);
    })
  }

  Search(){
    this.getArticle();
  }

}
