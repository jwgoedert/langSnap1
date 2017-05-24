import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindAddDeckPage } from './find-add-deck';

@NgModule({
  declarations: [
    FindAddDeckPage,
  ],
  imports: [
    IonicPageModule.forChild(FindAddDeckPage),
  ],
  exports: [
    FindAddDeckPage
  ]
})
export class FindAddDeckPageModule {}
