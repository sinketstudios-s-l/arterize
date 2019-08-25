import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatsService, chat } from '../chats.service'
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {


  public chatRooms : any = [];

  constructor(public router: Router, public chatService: ChatsService, public authServ: AuthService) { }

  ngOnInit() {
    this.chatService.getChatRooms().subscribe( chats => {
      
      this.chatRooms = chats
    
    })
  }

  OnLogout(){
    this.authServ.logout()
  }



  backBtn(){
    this.router.navigate(['../tabs/feed'])
  }

}
