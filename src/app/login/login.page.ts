import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string
  passwd: string
  emai: string


  constructor(
    public afAuth: AngularFireAuth, 
    public user: UserService, 
    public router: Router,
    public alert: AlertController) { }

  ngOnInit() {
  
  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['Close']
    })
    await alert.present()
  }

  async login(){
    const { username, passwd} = this
    try {
      
        const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@arterize.com', passwd)
        
        if(res.user){
            this.user.setUser({
              username,
              uid: res.user.uid
            })
            this.router.navigate(['/tabs']);
            
        }
      
      } catch(err){
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        console.log("User not Found");
        await this.showAlert('User not found','Check your username')
      } else if(err.code === "auth/wrong-password"){
        console.log("Wrong Password");
        await this.showAlert('Wrong Password','The password is invalid. Try again')
      }
    }

  }

}
