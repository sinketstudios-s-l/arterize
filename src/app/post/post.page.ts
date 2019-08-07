import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app'

@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

	postID: string
	effect: string = ''
	post
	postReference: AngularFirestoreDocument
	sub
	username: string = this.user.getUsername()
	heartType: string = "heart-empty"

	constructor(
		private route: ActivatedRoute, 
		private afs: AngularFirestore,
		private user: UserService,
		private router: Router) {

	}

	ngOnInit() {
		this.postID = this.route.snapshot.paramMap.get('id')
		this.postReference = this.afs.doc(`posts/${this.postID}`)
		this.sub = this.postReference.valueChanges().subscribe(val => {
			this.post = val
			this.effect = val.effect
			this.heartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty'
		})
	}


	ngOnDestroy() {
		this.sub.unsubscribe()
	}

	backBtn(){
		this.router.navigate(['../tabs/profile'])
	}

	toggleHeart() {
		if(this.heartType == 'heart-empty') {
			this.postReference.update({
				likes: firestore.FieldValue.arrayUnion(this.user.getUID())
			})
		} else {
			this.postReference.update({
				likes: firestore.FieldValue.arrayRemove(this.user.getUID())
			})
		}
	}

}
