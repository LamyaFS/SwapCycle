import { Component, inject, OnInit } from '@angular/core';
import { getDatabase, ref, query, orderByChild, equalTo, DataSnapshot, onValue } from "firebase/database";
import { ApiService } from '../services/api/api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  
 
})
export class MainPage implements OnInit {
  user: any;
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
    const userEmail = "user1@example.com"; // Get the logged-in user's email (replace with actual email)
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const userQuery = query(usersRef, orderByChild('email'), equalTo(userEmail));

    onValue(userQuery, (snapshot: DataSnapshot) => {
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        this.user = userData;
      });
    });
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
