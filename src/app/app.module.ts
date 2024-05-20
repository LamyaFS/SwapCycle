import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getAuth as getAuth_alias, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule,AngularFireModule.initializeApp(environment.firebase)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"swapcycle-f5400","appId":"1:615718133563:web:5044123db87784ec8d211e","databaseURL":"https://swapcycle-f5400-default-rtdb.firebaseio.com","storageBucket":"swapcycle-f5400.appspot.com","apiKey":"AIzaSyCv8oOMIP6OR6T-twIKqyAanT3qoTPRC3w","authDomain":"swapcycle-f5400.firebaseapp.com","messagingSenderId":"615718133563"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class AppModule {}



