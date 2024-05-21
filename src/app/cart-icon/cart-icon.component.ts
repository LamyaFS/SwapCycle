import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
})
export class CartIconComponent implements OnInit {
  itemCount: number = 0; // Initialize item count

  constructor() {}

  ngOnInit() {}

  // Function to update item count (replace with your cart logic)
  updateItemCount(count: number) {
    this.itemCount = count;
  }
}

