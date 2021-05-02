import { Component, OnInit } from '@angular/core';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { FavoriteResponseModel } from 'src/app/shared/model/responses/favorite-response-model';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-favorites-article',
  templateUrl: './favorites-article.component.html',
  styleUrls: ['./favorites-article.component.css']
})
export class FavoritesArticleComponent implements OnInit {
  articles: Array<FavoriteResponseModel> = [];
  page = 0;
  arrayPage = new Array();
  numberPage: number;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
      this.getAllFavorites();
  }

  getAllFavorites(){
      this.customerService.getListFavorites(this.page).subscribe(data => {
          this.articles = data;

          this.numberPage = data[0].pages;
          this.arrayPage = Array(this.numberPage).fill(0).map((x,i)=>i);
      })
  }

  onPage(page: number) {
    this.page = page;
    this.getAllFavorites();
  }

}
