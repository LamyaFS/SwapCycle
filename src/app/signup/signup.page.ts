import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {getDatabase, ref, set, push, remove, onValue, DataSnapshot} from "firebase/database";

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
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  User: UserInfo;
  Users: UserInfo[];

  constructor(private router: Router) {
    this.User = new UserInfo("", "", "", "");
    this.Users = [];
  }

  ngOnInit() {}

  signUp() {
    if (this.User.Name && this.User.Email && this.User.Password) {
      const db = getDatabase();
      const newUserRef = push(ref(db, 'users'));
      const newUser = new UserInfo(newUserRef.key!, this.User.Name, this.User.Email, this.User.Password);

      set(newUserRef, newUser)
        .then(() => {
          console.log('User added successfully');
          this.Users.push(newUser);
          this.User = new UserInfo("", "", "", ""); 
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    } else {
      console.error('Please fill out all fields');
    }
  }
}
