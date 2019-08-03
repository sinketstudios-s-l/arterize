import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firestore } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string
  desc: string


  constructor(
    public http: HttpClient,
    public afStore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  createPost(){
    const image = this.imageURL
    const desc = this.desc

    this.afStore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion({
        image,
        desc
      })

    })

  }

  fileChange(event){
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','28688731ce1b4c777ded')

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event)
      
    })

  }

}
