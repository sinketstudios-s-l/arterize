import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  username: string = "noooma"
  userPosts
  constructor(public afs: AngularFirestore, private user: UserService) { 
    const posts = afs.doc(`users/${user.getUID()}`)
    this.userPosts = posts.valueChanges()
  }
  
 
 



}
