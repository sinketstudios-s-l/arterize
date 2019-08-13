import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, ModalController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UploaderPage } from '../uploader/uploader.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

	@ViewChild('tabs', {static: true}) tabs: IonTabs

	constructor(
		private user: UserService, 
		private router: Router, 
		public modalCtrl: ModalController) { }

	ngOnInit() {
		this.tabs.select('feed')

		if(!this.user.isAuthenticated ){
			this.router.navigate(['/login'])
		} 
	}

	async uploadModal() {
		const modal = await this.modalCtrl.create({
			component: UploaderPage
		});
		return await modal.present()
	}
}
