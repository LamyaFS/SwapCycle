import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email: string = '';

  constructor(private sharedService: SharedService) {}  // Inject the shared service

  ngOnInit() {
    // Retrieve the stored email
    this.email = this.sharedService.getEmail();
  }

}
