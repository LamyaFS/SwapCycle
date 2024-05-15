import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  oApp = initializeApp(environment.firebase);
  oAuth = getAuth(this.oApp);
  
  gmail=""
  password=""

  constructor(private router: Router) { }

  login() {
    console.log('Logging in with:', this.gmail, this.password);
    this.router.navigate(['/home']);
  }

  forgotPassword() {
    console.log('Forgot Password clicked');
    this.router.navigate(['/forgot-password']);
  }

  signup() {    
    console.log('Register clicked');   
    this.router.navigate(['/signup']);
  }
  tomain() {
    const auth = getAuth();
    signInWithEmailAndPassword(this.oAuth, this.gmail, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });

      this.router.navigate(['/main']);
  }

  ngOnInit() {
  }
  


}
