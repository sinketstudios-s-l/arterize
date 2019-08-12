import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	username: string = ""
	password: string = ""

	constructor(
		public afAuth: AngularFireAuth, 
		public user: UserService, 
		public router: Router,
		private alertCtrl: AlertController) { }

	ngOnInit() {
		if(this.user.isAuthenticated ){
			this.router.navigate(['/tabs'])
		} 
		
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertCtrl.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async login() {
		
		const { username, password } = this
		
		try {
			// kind of a hack. 
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@arterize.es', password)
			
			if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
				})
				this.router.navigate(['/tabs'])
				
				
				

			}
		
		} catch(err) {
			console.dir(err)
			
			if(err.code === "auth/user-not-found") {
				console.log("User not found")
				
				this.presentAlert('User no exists',err.message);
			} else if(err.code === "auth/wrong-password") {
				console.log("Wrong Password")
				
				this.presentAlert('Invalid Password', err.message);
			}
		}
	}

}
