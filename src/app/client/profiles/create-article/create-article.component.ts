import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticlePostRequestModel } from 'src/app/shared/model/requests/article-post-request-model';
import { FirebaseService } from 'src/app/shared/upload-file/firebase.service';
import { AddressService } from '../../service/address.service';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  articleModel: ArticlePostRequestModel;
  articleForm : FormGroup;
  citys: [];
  districts: [];
  wards: [];
  selectedFile: File[] = null;
  urlFiles : "";
  wardId: number;

  constructor(private articleService: ArticleService ,private addressService: AddressService, private firebaseService: FirebaseService, private router: Router, private toastr: ToastrService) { 
      this.articleModel = {
        wardId: 0,
        address: "",
        title: "",
        description: "",
        roomPrice: 0,
        acreage: 0,
        electricPrice: 0,
        waterPrice: 0,
        wifiPrice: 0,
        image: "",
        video: "",
        roommateInsertDTO: null,
        vip: false,
        type: "",
        number: "",
      };
  }

  ngOnInit(): void {
      this.getAllCity();

      this.articleForm = new FormGroup({
          wardId: new FormControl("", Validators.required),
          address: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(220)]),
          title: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(220)]),
          description: new FormControl("", [Validators.minLength(3), Validators.maxLength(220)]),
          roomPrice: new FormControl("", [Validators.required, Validators.min(1000)]),
          acreage: new FormControl("", [Validators.required, Validators.min(1000)]),
          electricPrice: new FormControl("", [Validators.required, Validators.min(1000)]),
          waterPrice: new FormControl("", [Validators.required, Validators.min(1000)]),
          wifiPrice: new FormControl({value:""}, [Validators.required, Validators.min(1000)]),
          image: new FormControl("", [Validators.required]),
          video: new FormControl("", [Validators.minLength(3), Validators.maxLength(220)]),
        //   roommateInsertDTO: new FormControl("", Validators.required),
          vip: new FormControl("", [Validators.required]),
          type: new FormControl("", [Validators.required]),
          number: new FormControl("", [Validators.required, Validators.min(1)]),
      });
  }

  createArticle(){
      const fb = new FormData();
      for(var i=0; i<this.selectedFile.length; i++){
          fb.append('files', this.selectedFile[i]);
      }
          this.firebaseService.uploadFiles(fb).subscribe((data) => {
              console.log(data);
              this.urlFiles = data.join();
              this.uploadForm();
          }, (error) => {
              this.toastr.error(error.error.mess);
          });
  }

  uploadForm(){
      this.articleModel.wardId = this.articleForm.get('wardId').value;
      this.articleModel.address = this.articleForm.get('address').value;
      this.articleModel.title = this.articleForm.get('title').value;
      this.articleModel.description = this.articleForm.get('description').value;
      this.articleModel.roomPrice = this.articleForm.get('roomPrice').value;
      this.articleModel.acreage = this.articleForm.get('acreage').value;
      this.articleModel.electricPrice = this.articleForm.get('electricPrice').value;
      this.articleModel.waterPrice = this.articleForm.get('waterPrice').value;
      this.articleModel.wifiPrice = this.articleForm.get('wifiPrice').value;
      this.articleModel.image = this.urlFiles;
      this.articleModel.video = this.articleForm.get('video').value;
      this.articleModel.vip = this.articleForm.get('vip').value;
      this.articleModel.type = this.articleForm.get('type').value;
      this.articleModel.number = this.articleForm.get('number').value;
        
      this.articleService.createArticle(this.articleModel).subscribe((data) => {
          this.toastr.success('Thành công');
          this.router.navigate(['/profile/article-manager']);

      }, (error) => {
          this.toastr.error("Vui lòng kiểm tra lại thông tin");
      });
  }

  getAllCity(){
      this.addressService.getAllCity().subscribe(data => {
          this.citys = data;
      });
  }

  getAllDistrictByCityId(cityId: number){
      this.addressService.getDistrictById(cityId).subscribe(data => {
          this.districts = data;
      })
  }

  getAllWardByDistrictId(districtId: number){
      this.addressService.getWardById(districtId).subscribe(data => {
          this.wards = data;
      })
  }

  getWardId(wardId: number){
      this.wardId = wardId;
  }

  getFiles(event){
    this.selectedFile = event.target.files;
}
}
