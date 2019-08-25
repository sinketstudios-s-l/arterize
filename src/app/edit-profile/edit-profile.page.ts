import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.page.html',
	styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {

	mainuser: AngularFirestoreDocument
	sub
	username: string
	profilePic: string

	password: string
	newpassword: string

	busy: boolean = false


	constructor(
		private http: Http, 
		private afs: AngularFirestore,
		private router: Router,
		private alertController: AlertController,
		private user: UserService,
		public modalCtrl: ModalController,
		public actionSheetCtrl: ActionSheetController) {
		this.mainuser = afs.doc(`users/${user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.username = event.username
			this.profilePic = event.profilePic
		})
	}

	async cancelUpdate(){

		const actionSheet = await this.actionSheetCtrl.create({
			buttons: [{
				text: 'Close',
				role: 'destructive',
			  handler: () => {
				this.modalCtrl.dismiss()
			  }
			}, {
			  text: 'Cancel',
			  role: 'cancel',
			  handler: () => {}

			}]
		  });
		  await actionSheet.present();
	}


	ngOnDestroy() {
		this.sub.unsubscribe()
	}

	updateProfilePic() {
		console.log('profile img')
	}

	uploadPic(event) {
		const files = event.target.files

		const data = new FormData()
		data.append('file', files[0])
		data.append('UPLOADCARE_STORE', '1')
		data.append('UPLOADCARE_PUB_KEY', 'ada5e3cb2da06dee6d82')
		
		this.http.post('https://upload.uploadcare.com/base/', data)
		.subscribe(event => {
			const uuid = event.json().file
			this.mainuser.update({
				profilePic: uuid
			})
		})
	}

	logOut(){
		
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async updateDetails() {
		this.busy = true
		
		try {
			await this.user.reAuth(this.user.getUsername(), this.password)
		} catch(error) {
		
		}

		if(this.newpassword) {
			await this.user.updatePassword(this.newpassword)
		}

		if(this.username !== this.user.getUsername()) {
			await this.user.updateEmail(this.username)
			this.mainuser.update({
				username: this.username
			})
		}

		this.password = ""
		this.newpassword = ""
		this.busy = false

		
		this.modalCtrl.dismiss()

		console.log('updated ' + this.username)
		
	}

}
