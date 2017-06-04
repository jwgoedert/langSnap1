import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhraseModalPage } from './phrase-modal';

@NgModule({
  declarations: [
    PhraseModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PhraseModalPage),
  ],
  exports: [
    PhraseModalPage
  ]
})
export class PhraseModalPageModule {}
