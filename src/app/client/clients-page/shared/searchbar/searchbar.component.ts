import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  typeRoom: number = 1;
  cityId: number;
  districtId: number;
  wardId: number;
  href: string;

  constructor(private addressService: AddressService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCity();
  }

  getAllCity(){
      this.addressService.getAllCity().subscribe(data => {
          this.citys = data;
      });
  }

  getAllDistrictByCityId(cityId: number){
      this.cityId = cityId;
      this.addressService.getDistrictById(cityId).subscribe(data => {
          this.districts = data;
      })
  }

  getAllWardByDistrictId(districtId: number){
    this.districtId = districtId;
      this.addressService.getWardById(districtId).subscribe(data => {
          this.wards = data;
      })
  }

  getWardById(wardId: number){
    this.wardId = wardId;
  }

  getTypeRoomId(typeRoom: number){
    this.typeRoom = typeRoom;
  }

  onFilter(){
    console.log(this.typeRoom);
    console.log(this.cityId);
    console.log(this.districtId);
    console.log(this.wardId);
    if(this.typeRoom === 1){
      this.href = `rent-room?type=${this.typeRoom}&city=${this.cityId}&district=${this.districtId}&ward=${this.wardId}`;
    }else{
      this.href = `room-mates?type=${this.typeRoom}&city=${this.cityId}&district=${this.districtId}&ward=${this.wardId}`;
    }
  }
  
}
