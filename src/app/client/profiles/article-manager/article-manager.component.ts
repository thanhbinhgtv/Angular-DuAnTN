import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.css']
})
export class ArticleManagerComponent implements OnInit {
  articles: Array<ArticleResponseModel> = [];
  page = 0;
  arrayPage = new Array();
  numberPage: number;
  isBuff: boolean= false;
  point = new FormControl('');
  buffArticleId: number;

  constructor(private articleService: ArticleService, private toastr: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
      this.getAllArticleCustomer();
  }

  getAllArticleCustomer(){
      this.articleService.getAllArticleCustomer(this.page).subscribe(data => {
          this.articles = data;
          
          this.numberPage = data[0].pages;
          this.arrayPage = Array(this.numberPage).fill(0).map((x,i)=>i);
      })
  }

  onPage(page: number) {
    this.page = page;
    this.getAllArticleCustomer();
  }

  onBuff(){
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent);
      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
    this.articleService.getBuff(this.buffArticleId, this.point.value).subscribe(data => {
        this.toastr.success("Buff điểm thành công");
        this.isBuff = false;
    }, error => {
        this.toastr.error("Buff thất bại, kiểm tra lại thông tin");
        this.isBuff = false;
    })
  }
});
  }

  getArticleId(articleId: number){
    this.isBuff = !this.isBuff;
    this.buffArticleId = articleId;
    console.log(this.buffArticleId);
    
  }

}
