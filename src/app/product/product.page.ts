import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { getDatabase, ref, set, get, child } from 'firebase/database';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productImage: string = '';
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

  constructor(private http: HttpClient, private router: Router) {
    this.currentLat = 0;
    this.currentLon = 0;
  }

  ngOnInit() {
    this.loadProducts();
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
