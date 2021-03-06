import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';


@Component({
	selector: 'app-page',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	mainuser: AngularFirestoreDocument
	userPosts
	sub
	posts
	username: string
	profilePic: string
	
	followersCount: number
	followingCount: number
	postCount: number
	
	email: string
	name: string
	link: string
	bio: string


	constructor(private afs: AngularFirestore, private user: UserService, private router: Router, public modalCtrl: ModalController) {
		this.mainuser = afs.doc(`users/${user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.posts = event.posts
			this.username = event.username
			this.profilePic = event.profilePic
			this.followingCount = event.followingCount
			this.followersCount = event.followersCount
			this.postCount = event.postCount
			this.email = event.email
			this.name = event.name
			this.link = event.link
			this.bio = event.biography
		})
	}



	ngOnInit() {

	}



	ngOnDestroy() {
		this.sub.unsubscribe()
	}

	goTo(postID: string) {

		this.router.navigate(['/tabs/post/' + postID.split('/')[0]])
	}

	

	async editProfModal(){
		const result = await this.modalCtrl.create({
			component: EditProfilePage,
		})
		await result.present();
	}
	

}
