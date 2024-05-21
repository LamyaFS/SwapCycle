import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items: any[] = [
    {
      id: '1',
      name: 'Cat',
      price: 1000,
      status: true,
      rating: 4.9,
      cover: 'assets/leo1.png',
      description: 'Cute cat'
    },
    {
      id: '2',
      name: 'Leo',
      price: 500,
      status: true,
      rating: 4.7,
      cover: 'assets/leo2.png',
      description: 'Tahminas cat'
    },
    
  ];

  constructor() { }
}