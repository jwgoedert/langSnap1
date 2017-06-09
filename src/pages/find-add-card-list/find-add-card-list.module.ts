import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindAddCardListPage } from './find-add-card-list';

@NgModule({
  declarations: [
    FindAddCardListPage,
  ],
  imports: [
    IonicPageModule.forChild(FindAddCardListPage),
  ],
  exports: [
    FindAddCardListPage
  ]
})
export class FindAddCardListPageModule {}
