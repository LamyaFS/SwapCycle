import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get, push, set, remove } from 'firebase/database';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

 

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  products: any[] = [];
  isModalOpen = false;
  selectedProduct: any = null;

  constructor(private router: Router) {}

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
        const product = childSnapshot.val();
        product.key = childSnapshot.key; // Add unique key to the product
        this.products.push(product);
      });
      console.log('Loaded Products: ', this.products); // Log loaded products
    } else {
      console.log('No products available');
    }
  }

  ngOnInit() {
    this.loadProducts();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  openProductDetails(product: any) {
    this.selectedProduct = product;
    console.log('Selected Product: ', this.selectedProduct); // Log selected product for debugging
    this.setOpen(true);
  }

  async addToOrders(selectedProduct: any) {
    const db = getDatabase();
    const ordersRef = ref(db, 'orders');
    const newOrderRef = push(ordersRef);

    // Add selected product to orders
    set(newOrderRef, selectedProduct)
      .then(async () => {
        console.log('Product added to orders Successfully');
        // Find the index of selected product in the products array
        const index = this.products.findIndex(prod => prod.key === selectedProduct.key);
        // Remove selected product from products array
        if (index !== -1) {
          this.products.splice(index, 1);
        }

        // Remove the product from the database
        const productRef = ref(db, 'products/' + selectedProduct.key);
        await remove(productRef);

        // Navigate back to main page
        this.router.navigate(['tabs/main']);
      })
      .catch((error) => {
        console.error('Error adding product to orders: ', error);
        // Navigate back to main page even if there's an error
        this.router.navigate(['tabs/main']);
      });
  }
  
}