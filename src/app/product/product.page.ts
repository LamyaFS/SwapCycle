import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { getDatabase, ref, query, orderByChild, equalTo, DataSnapshot , onValue} from "firebase/database";

declare var google: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productImage: string = '';
  ProductName: string ='';
  Condition: string = '';
  TimeSlot: string = '';
  Day: string='';
  
  currentLat: number;
  currentLon: number;
  mapElementRef: any;
  map: any;
  service: any;

  constructor(private http: HttpClient, private router: Router) {

    this.currentLat=0;
    this.currentLon=0;

  }

  ngOnInit() {
    this.loadMap();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    this.productImage = `data:image/jpeg;base64,${image.base64String}`;
  }


  async getPosition()
  {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentLat = coordinates.coords.latitude;
    this.currentLon = coordinates.coords.longitude;
  }
  async loadMap() {
    await this.getPosition();
    let mapOptions = {
      center: { lat: this.currentLat, lng: this.currentLon },
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.mapElementRef = document.getElementById("map");
    this.map = new google.maps.Map(this.mapElementRef, mapOptions);
    this.service = new google.maps.places.PlacesService(this.map);
    let currentLocation = { lat: this.currentLat, lng: this.currentLat };
    
  }
  uploadProduct() {
    
    this.router.navigate(['tabs/main'])
  }
}
