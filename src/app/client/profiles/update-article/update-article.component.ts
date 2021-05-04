import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoogleMapApiResponse } from 'src/app/shared/model/responses/google-map-api-response';
import { FirebaseService } from 'src/app/shared/upload-file/firebase.service';
import { AddressService } from '../../service/address.service';
import { ArticleService } from '../../service/article.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticlePutRequestModel, roommate } from 'src/app/shared/model/requests/article-put-request-model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-create-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  public Editor = ClassicEditor;
  articleModel: ArticlePutRequestModel;
  articleForm : FormGroup;
  citys: [];
  districts: [];
  wards: [];
  selectedFile: File[] = null;
  urlFiles : "";
  wardId: number;
  wardName: string = "";
  districtName: string;
  cityName: string;
  typeArticle: number;
  articleId: number;
  isLoading: boolean = false;

  latitude: number = 21.028511;
  longitude: number = 105.804817;

  constructor(private articleService: ArticleService, private httpClient: HttpClient, private addressService: AddressService,
     private firebaseService: FirebaseService, private router: Router, private toastr: ToastrService,
      private activateRoute: ActivatedRoute,  private dialog: MatDialog) { 
      this.articleId = this.activateRoute.snapshot.params.id;
      this.articleModel = {} as ArticlePutRequestModel;
      this.articleModel.roommateDTO = {} as roommate;
  }

  ngOnInit(): void {
      this.getAllCity();

      this.articleForm = new FormGroup({
          wardId: new FormControl("", Validators.required),
          address: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(220)]),
          title: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(220)]),
          description: new FormControl("", [Validators.minLength(3), Validators.maxLength(10000)]),
          roomPrice: new FormControl("", [Validators.required, Validators.min(1000)]),
          acreage: new FormControl("", [Validators.required, Validators.min(1000)]),
          electricPrice: new FormControl("", [Validators.required, Validators.min(1000)]),
          waterPrice: new FormControl("", [Validators.required, Validators.min(1000)]),
          wifiPrice: new FormControl({value:""}, [Validators.required, Validators.min(1000)]),
          image: new FormControl("", [Validators.required]),
          video: new FormControl(""),
          // vip: new FormControl("", [Validators.required]),
          // type: new FormControl("", [Validators.required]),
          // number: new FormControl("", [Validators.required, Validators.min(1)]),
          rmDescription: new FormControl(null),
          rmGender: new FormControl(null),
          rmQuantity: new FormControl(null),
      });
  }

  createArticle(){
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent);
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
      this.isLoading = true;
      const fb = new FormData();
      for(var i=0; i<this.selectedFile.length; i++){
          fb.append('files', this.selectedFile[i]);
      }
          this.firebaseService.uploadFiles(fb).subscribe((data) => {
              console.log(data);
              this.urlFiles = data.join();
              this.uploadForm();
              this.isLoading = false;
          }, (error) => {
              this.toastr.error(error.error.mess);
              this.isLoading = false;
          });
        }
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
      // this.articleModel.vip = this.articleForm.get('vip').value;
      // this.articleModel.type = this.articleForm.get('type').value;
      // this.articleModel.number = this.articleForm.get('number').value;
      console.log(this.articleForm.get('rmGender').value);
      console.log(this.articleForm.get('rmQuantity').value);
      console.log(this.articleForm.get('rmDescription').value);
      this.articleModel.roommateDTO.gender = this.articleForm.get('rmGender').value;
      this.articleModel.roommateDTO.quantity = this.articleForm.get('rmQuantity').value;
      this.articleModel.roommateDTO.description = this.articleForm.get('rmDescription').value;
        console.log(this.articleModel);
        
        if(this.articleModel.roommateDTO.gender == null || this.articleForm.get('rmGender').value == 'null' || this.articleModel.roommateDTO.quantity == null){
            this.articleModel.roommateDTO = null;
        }
      this.articleService.updateArticle(this.articleId, this.articleModel).subscribe((data) => {
          this.toastr.success('Sửa bài viết Thành công');
          this.router.navigate(['/profile/article-manager']);

      }, (error) => {
          if(error.error.mess){
            this.toastr.error(error.error.mess);
          }else{
            this.toastr.error("Vui lòng kiểm tra lại thông tin");
          }
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

          const city:any = this.citys.find((o:any) => o.id === +cityId);
          this.cityName = city.name;
          this.loadMap();
      })
  }

  getAllWardByDistrictId(districtId: number){
      this.addressService.getWardById(districtId).subscribe(data => {
          this.wards = data;

          const district:any = this.districts.find((o:any) => o.id === +districtId);
          this.districtName = district.name;
          this.loadMap();
      })
  }

  getWardId(wardId: number){
      this.wardId = wardId;

      const wards:any = this.wards.find((o: any) => o.id === +wardId);
      this.wardName = wards.name;
      this.loadMap();
  }

  getFiles(event){
      this.selectedFile = event.target.files;
  }

  getTypeArticle(typeArticle: number){
      this.typeArticle = +typeArticle;
  }

  loadMap(){
    this.httpClient.get<GoogleMapApiResponse>
    (`https://maps.googleapis.com/maps/api/geocode/json?address=${this.cityName+', '}${this.districtName+', '}${this.wardName}&key=${"AIzaSyDKZ5wTHBFxhvaU2_82x-QiFllwf0fOnB0"}`).subscribe(data => {
        this.latitude = data.results[0].geometry.location.lat;
        this.longitude = data.results[0].geometry.location.lng;
        console.log(data.results[0].geometry.location.lat);
        console.log(data.results[0].geometry.location.lng);
    });
  }

}
