import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getDatabase, ref, query, orderByChild, equalTo, DataSnapshot , onValue} from "firebase/database";

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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.email && this.password) {
      const db = getDatabase();
      const usersRef = ref(db, 'users');
      const userQuery = query(usersRef, orderByChild('Email'), equalTo(this.email));

      // Check if the user with the provided email exists
      onValue(userQuery, (snapshot: DataSnapshot) => {
        let userFound = false;
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          if (user.Password === this.password) {
            userFound = true;
            // User found and password matches, navigate to main page
            this.router.navigate(['tabs/main']);
          }
        });
        if (!userFound) {
          // User not found or password doesn't match, show error message
          this.errorMessage = 'Invalid email or password';
        }
      });
    } else {
      // Email or password is empty, show error message
      this.errorMessage = 'Please enter email and password';
    }
  }
  navigateToForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }
  signUp(){
    this.router.navigate(['/signup'])
  }
}
