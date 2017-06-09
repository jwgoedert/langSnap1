import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OthersDecksViewerPage } from './others-decks-viewer';

@NgModule({
  declarations: [
    OthersDecksViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(OthersDecksViewerPage),
  ],
  exports: [
    OthersDecksViewerPage
  ]
})
export class OthersDecksViewerPageModule {}
