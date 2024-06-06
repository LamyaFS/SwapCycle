import { Component, inject, OnInit } from '@angular/core';
import { getDatabase, ref, query, orderByChild, equalTo, DataSnapshot, onValue } from "firebase/database";
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
  ngOnInit() {
  }
 
}
