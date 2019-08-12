import { Component, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserService } from '../user.service';





@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  
  searchtem: string

  startAt = new Subject();
  endAt = new Subject();

  users;

  startobs = this.startAt.asObservable()
  endobs = this.endAt.asObservable()
  
  profilePic: string

  constructor(private afs: AngularFirestore, private router: Router, private user: UserService) { 
    
  
  }

  ngOnInit() {
    combineLatest(this.startobs, this.endobs).subscribe((value) =>{
      this.firequery(value[0], value[1]).subscribe((users) =>{
        this.users = users;
      })
    })
  }


  search(event){

    let q = event.target.value
    this.startAt.next(q)
    this.endAt.next(q + "\uf8ff")

    console.log(q)
  }

  firequery(start, end){
    return this.afs.collection('users', ref => ref.limit(10).orderBy('username').startAt(start).endAt(end)).valueChanges();
  }


  userProf( event ){
    
    const uName: string = event.target.id

    console.log(uName)

    this.router.navigate([`profile/${uName}`])
  }


}
