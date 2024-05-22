import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  

  constructor(private router: Router) { }

  login() {
    
    this.router.navigate(['/home']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  signup() {   
    this.router.navigate(['/signup']);
  }
  tomain() {
      this.router.navigate(['/main']);
  }

  ngOnInit() {
  }
  


}
