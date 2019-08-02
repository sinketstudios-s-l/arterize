import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule' },
            { path: 'search', loadChildren: '../search/search.module#SearchPageModule' },
            { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule' },
            { path: 'notifications', loadChildren: '../notifications/notifications.module#NotificationsPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' }
        ]
    }
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TabsRoutingModule { }