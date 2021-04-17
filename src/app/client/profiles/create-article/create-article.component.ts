import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
  citys: [];
  districts: [];
  wards: [];

  constructor(private addressService: AddressService) { }

  ngOnInit(): void {
      this.getAllCity();
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
}
