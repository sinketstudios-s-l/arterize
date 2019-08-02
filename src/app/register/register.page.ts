import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string
  email: string
  passwd: string 
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router

  ) { }

  ngOnInit() {
  }

  async register() {
    const { email, passwd } = this

    try {

        const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, passwd)
        console.log(res + 'username: ' + this.username)

        this.showAlert('Success', 'Welcome to Arterize')
        this.router.navigate(['/tabs'])

    } catch(error){
        console.dir(error)
        this.showAlert("Error", error.message)
    }

  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Close"]
    });
    await alert.present();
  }
  

}
