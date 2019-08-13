import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { TabsRoutingModule } from './tabs.router.module'
import { UploaderPage } from '../uploader/uploader.page';
import { UploaderPageModule } from '../uploader/uploader.module';


@NgModule({
  entryComponents: [
    UploaderPage
  ],
  imports: [
    CommonModule,
    FormsModule,
	IonicModule,
  TabsRoutingModule,
  UploaderPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
