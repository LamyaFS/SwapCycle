import { Component, OnDestroy } from '@angular/core';
import { getDatabase, ref, onValue, off } from 'firebase/database';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnDestroy {
  orders: any[] = [];
  ordersRef: any; // Reference to the database listener

  constructor() {}

  ngOnInit() {
    this.loadOrders();
  }

  ngOnDestroy() {
    // Unsubscribe from the listener when component is destroyed
    if (this.ordersRef) {
      off(this.ordersRef);
    }
  }

  loadOrders() {
    const db = getDatabase();
    const ordersRef = ref(db, 'orders');

    // Subscribe to the "orders" node only if not subscribed already
    if (!this.ordersRef) {
      this.ordersRef = onValue(ordersRef, (snapshot) => {
        if (snapshot.exists()) {
          const fetchedOrders: any[] = [];
          snapshot.forEach((childSnapshot) => {
            const order = childSnapshot.val();
            // Check if the order already exists in the array to avoid duplicates
            const existingOrder = this.orders.find(o => o.id === order.id);
            if (!existingOrder) {
              fetchedOrders.push(order); // Push each new order to fetchedOrders array
            }
          });
          // Add new orders to existing orders array
          this.orders.push(...fetchedOrders);
        } else {
          console.log('No orders available');
        }
      });
    }
  }
}
