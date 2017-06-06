import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindCardPage } from './find-card';

@NgModule({
  declarations: [
    FindCardPage,
  ],
  imports: [
    IonicPageModule.forChild(FindCardPage),
  ],
  exports: [
    FindCardPage
  ]
})
export class FindCardPageModule {}
