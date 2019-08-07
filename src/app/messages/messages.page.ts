import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  backBtn(){
    this.router.navigate(['../tabs/feed'])
  }

}
