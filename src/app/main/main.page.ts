import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor() { }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  ngOnInit() {
  }

}
