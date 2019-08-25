import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


export interface chat {
  message: string
  username: string
  id: string
  img: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private afs: AngularFirestore) { }


  getChatRooms(){
    return this.afs.collection('chats').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as chat
        data.id = a.payload.doc.id
        return data;
      })
    }))
  }



}
