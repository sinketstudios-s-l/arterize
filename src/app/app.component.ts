import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subject, Observable, combineLatest } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  searchterm: string;

  startAt = new Subject()
  endAt = new Subject();

  users;

  startObs = this.startAt.asObservable();
  endObs = this.endAt.asObservable();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afs: AngularFirestore
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    combineLatest(this.startObs, this.endObs).subscribe((value) =>{
      this.firequery(value[0], value[1]).subscribe((users) => {
        this.users = users;
      })
    })
  }

  search($event){
    let q = $event.target.value
    this.startAt.next(q)
    this.endAt.next(q + "\uf8ff")
  }


  firequery(start, end){
    return this.afs.collection('users' , ref => ref.limit(4).orderBy('username').startAt(start).endAt(end)).valueChanges();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



}
