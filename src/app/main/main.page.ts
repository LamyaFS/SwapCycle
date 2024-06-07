import { Component, inject, OnInit } from '@angular/core';
import { getDatabase, ref, query, orderByChild, equalTo, DataSnapshot, onValue,get } from "firebase/database";
 import {Router} from '@angular/router';
 
 
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
   
})

export class MainPage implements OnInit {
  products: any[] = [];
  
  constructor(private router: Router) { }

  navigateToProductPage() {
    this.router.navigate(['/product']);
  }


  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
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

  ngOnInit() {
    this.loadProducts();
  }
 
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
