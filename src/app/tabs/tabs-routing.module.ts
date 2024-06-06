import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { MainPage } from '../main/main.page';
import { NotificationPage } from '../notification/notification.page';
import { FavouritesPage } from '../favourites/favourites.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'main',
        loadChildren: () => import('../main/main.module').then( m => m.MainPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
