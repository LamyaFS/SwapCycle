import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue, DataSnapshot } from "firebase/database";
import { Router } from '@angular/router';

class UserInfo {
  users: string;
  Name: string;
  Email: string;
  Password: string;

  constructor(users: string, Name: string, Email: string, Password: string) {
    this.users = users;
    this.Name = Name;
    this.Email = Email;
    this.Password = Password;
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: UserInfo | null = null;
  

  constructor(private router: Router) {} 

  ngOnInit() {
    this.loadUser();
  }
  loadUser() {
    const userData = localStorage.getItem('loggedInUser');
    console.log('Retrieved user data from local storage:', userData);
    if (userData) {
      this.user = JSON.parse(userData);
      console.log('Parsed user data:', this.user);
    }
  }
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
