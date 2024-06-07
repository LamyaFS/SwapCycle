import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { getDatabase, ref, set, get, child } from 'firebase/database';
declare var google: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productImage: string = '';
  UserName: string='';
  ProductName: string = '';
  Condition: string = '';
  TimeSlot: string = '';
  Day: string = '';
  
  currentLat: number;
  currentLon: number;
  mapElementRef: any;
  map: any;
  service: any;
  display: any;

  products: any[] = []; // Array to hold product data
  Contact: any;

  constructor(private http: HttpClient, private router: Router) {
    this.currentLat = 0;
    this.currentLon = 0;
  }

  ngOnInit() {
    this.loadProducts();
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
    console.log('Captured Image: ', this.productImage);
  }

  async getPosition() {
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
   
    const image = "";
   
    this.addMarker(this.currentLat, this.currentLon, "My Location", "https://imgtr.ee/images/2024/06/04/b6ad2f1b595dfd441da35e3f7423d87a.png%22");
   
    this.service = new google.maps.places.PlacesService(this.map);
   
    let currentLocation = { lat: this.currentLat, lng: this.currentLon };
    
  }
  addMarker(latitude:number, longitude:number, placeName:string, image:any){
    const marker = new google.maps.Marker({
      position:{lat: latitude, lng:longitude},
      map: this.map,
      icon:image
    });
  return marker;
  }  

  isFormValid(): boolean {
    return (
      !!this.UserName &&
      !!this.Contact &&
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
        seller:this.UserName,
        contact:this.Contact,
        image: this.productImage,
        name: this.ProductName,
        condition: this.Condition,
        timeSlot: this.TimeSlot,
        day: this.Day,
        latitude: this.currentLat,
        longitude: this.currentLon,
      };

      const db = getDatabase();
      const newProductRef = ref(db, 'products/' + this.ProductName);
      await set(newProductRef, productData);
      this.products.push(productData);

      this.router.navigate(['tabs/main']);
    } else {
      alert('Please fill in all the details');
    }
  }

  async loadProducts() {
    const db = getDatabase();
    const productsRef = ref(db, 'products/');
    const snapshot = await get(productsRef);

    if (snapshot.exists()) {
      this.products = [];
      snapshot.forEach((childSnapshot) => {
        this.products.push(childSnapshot.val());
      });
      console.log('Loaded Products: ', this.products); // Log loaded products
    } else {
      console.log('No products available');
    }
  }
}
