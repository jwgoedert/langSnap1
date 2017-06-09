import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransImagePage } from './trans-image';

@NgModule({
  declarations: [
    TransImagePage,
  ],
  imports: [
    IonicPageModule.forChild(TransImagePage),
  ],
  exports: [
    TransImagePage
  ]
})
export class TransImagePageModule {}
