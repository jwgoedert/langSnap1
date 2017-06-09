import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransViewerPage } from './trans-viewer';

@NgModule({
  declarations: [
    TransViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(TransViewerPage),
  ],
  exports: [
    TransViewerPage
  ]
})
export class TransViewerPageModule {}
