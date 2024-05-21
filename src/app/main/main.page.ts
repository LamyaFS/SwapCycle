import { Component, inject, OnInit } from '@angular/core';


import { ApiService } from '../services/api/api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  
 
})
export class MainPage implements OnInit {
  items: any[] = [];
  allItems: any[] = [];
  query!: string;
  totalItems = 0;
  cartSub!: Subscription;
  private api = inject(ApiService);


  constructor() { }
 swiperSlideChanged(e:any){
  console.log('changed: ', e);
 }
  ngOnInit() {
    console.log('ngoninit mainpage');
    this.getItems();
  }
  getItems() {
    this.allItems = this.api.items;
    this.items = [...this.allItems];
  }
  onSearchChange(event: any) {
    console.log(event.detail.value);

    this.query = event.detail.value.toLowerCase();
    this.querySearch();
  }
  querySearch() {
    this.items = [];
    if (this.query.length > 0) {
      this.searchItems();
    } else {
      this.items = [...this.allItems];
    }
  }
  searchItems() {
    this.items = this.api.items.filter((item) =>
      item.name.toLowerCase().includes(this.query)
    );
}
}
