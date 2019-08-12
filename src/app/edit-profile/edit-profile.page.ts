import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.page.html',
	styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

	mainuser: AngularFirestoreDocument
	sub
	username: string
	profilePic: string

	password: string
	newpassword: string

	busy: boolean = false

	@ViewChild('fileBtn', {static: true}) fileBtn: {
		nativeElement: HTMLInputElement
	}

	constructor(
		private http: Http, 
		private afs: AngularFirestore,
		private router: Router,
		private alertController: AlertController,
		private user: UserService) {
		this.mainuser = afs.doc(`users/${user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.username = event.username
			this.profilePic = event.profilePic
		})
	}

	ngOnInit() {
		
	}

	ngOnDestroy() {

	}

	updateProfilePic() {
		this.fileBtn.nativeElement.click()
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
		if(this.user.isAuthenticated){

			if(this.sub.unsubscribe() ){
				this.router.navigate(['/login'])
				console.log('bye' + this.sub)
			}
			console.log(this.sub)
		}
		
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

		

		this.router.navigate(['/tabs/profile'])
	}

}
