import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from "firebase/app";
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@capacitor/camera';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})


export class AppModule {}
const firebaseConfig = {
  apiKey: "AIzaSyAIWzE2YI1xIIH4jlBaJWNk2NrUj6AQU6o",
  authDomain: "swapcycle1.firebaseapp.com",
  projectId: "swapcycle1",
  storageBucket: "swapcycle1.appspot.com",
  messagingSenderId: "300935588922",
  appId: "1:300935588922:web:87bb0b1a0fc78c191f5903"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


