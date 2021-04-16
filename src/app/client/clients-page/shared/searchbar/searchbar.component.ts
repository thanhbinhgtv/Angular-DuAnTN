import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/client/service/address.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
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
