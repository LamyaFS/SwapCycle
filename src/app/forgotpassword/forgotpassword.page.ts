import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, query, orderByChild, equalTo, DataSnapshot, onValue } from "firebase/database";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage {
  email: string = '';
  errorMessage: string = '';
  password: string = '';

  constructor() {}

  retrievePassword() {
    if (this.email) {
      const db = getDatabase();
      const usersRef = ref(db, 'users');
      const userQuery = query(usersRef, orderByChild('Email'), equalTo(this.email));

      // Check if the user with the provided email exists
      onValue(userQuery, (snapshot: DataSnapshot) => {
        let userFound = false;
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          if (user.Email === this.email) {
            userFound = true;
            // User found, retrieve and display the password
            this.password = `Your password is: ${user.Password}`;
          }
        });
        if (!userFound) {
          // User not found, show error message
          this.errorMessage = 'Email not found';
          this.password = '';
        }
      });
    } else {
      // Email is empty, show error message
      this.errorMessage = 'Please enter your email';
      this.password = '';
    }

}
}
