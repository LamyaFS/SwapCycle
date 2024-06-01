import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items: any[] = [
    {
      id: '1',
      name: 'PS5',
      
      status: true,
      
      cover: 'assets/Products/PS5.jpeg',
      description: 'PS5'
    },
    {
      id: '2',
      name: 'Lounge sofa',
      
      status: true,
      
      cover: 'assets/Products/loungeSofa.jpeg',
      description: 'Off-white wool lounge sofa'
    },
    {
      id: '3',
      name: 'Wooden desk',
      
      status: true,
      
      cover: 'assets/Products/woodenDesk.jpeg',
      description: 'Dark stained wooden desk with drawer'
    },
    {
      id: '4',
      name: 'Lenovo Laptop',
      
      status: true,
      
      cover: 'assets/Products/laptop.jpeg',
      description: 'Lenovo ThinkPad L450-20DT 15.6" Intel Core i5-4300U'
    },
    {
    id: '5',
      name: 'Sofa set',
      
      status: true,
      
      cover: 'assets/Products/sofa set.jpg',
      description: 'Sofa'
    },
    {
      id: '6',
        name: 'Washing machine',
        
        status: true,
        
        cover: 'assets/Products/WM.webp',
        description: 'White automatic washing machine'
      }
  ];

  constructor() { }
}