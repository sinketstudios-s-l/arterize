import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

	@ViewChild('tabs', {static: true}) tabs: IonTabs

	constructor(private user: UserService, private router: Router) { }

	ngOnInit() {
		if(!this.user.isAuthenticated ){
			this.router.navigate(['/login'])
		} 
		
		this.tabs.select('feed')
	}

	uName: string = this.user.getUsername()
}
