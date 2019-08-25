import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import firebaseConfig from './firebase'

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { FollowService } from './follow.service';

import { ShareModule } from './share.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [

  ],
  imports: [
	  BrowserModule, 
	  IonicModule.forRoot(), 
	  AppRoutingModule,
	  AngularFireModule.initializeApp(firebaseConfig),
	  AngularFireAuthModule,
	  AngularFirestoreModule.enablePersistence(),
	  HttpModule,
	  ShareModule,
	  FormsModule
	],
  providers: [
    StatusBar,
    SplashScreen,
	{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	{provide: FirestoreSettingsToken,  useValue:{} },
	UserService,
	AuthService,
	FollowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
