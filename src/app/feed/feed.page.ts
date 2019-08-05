import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }

  openChat(){
    
    this.route.navigate(['../chat'])

  }


}
