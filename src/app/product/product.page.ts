import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { getDatabase, ref, set } from 'firebase/database';

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
  display:any;

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
    };

    this.mapElementRef = document.getElementById("map");
    this.map = new google.maps.Map(this.mapElementRef, mapOptions);
    this.service = new google.maps.places.PlacesService(this.map);

    let currentLocation = { lat: this.currentLat, lng: this.currentLon };
    let marker = new google.maps.Marker({
      position: currentLocation,
      map: this.map,
      title: 'Current Location'
    });
  }
  isFormValid(): boolean {
    return (
      !!this.productImage && 
      !!this.ProductName && 
      !!this.Condition && 
      !!this.TimeSlot && 
      !!this.Day && 
      this.currentLat !== 0 && 
      this.currentLon !== 0
    );
  }
  
  async uploadProduct() {
    if (this.isFormValid()) {
      const productData = {
        image: this.productImage,
        name: this.ProductName,
        condition: this.Condition,
        timeSlot: this.TimeSlot,
        day: this.Day,
        latitude: this.currentLat,
        longitude: this.currentLon,
      };

      // Save the product data to the database
      const db = getDatabase();
      const newProductRef = ref(db, 'products/' + this.ProductName);
      await set(newProductRef, productData);

      // Navigate to the main page
      this.router.navigate(['tabs/main']);
    } else {
      alert('Please fill in all the details');
    }
  }
}
