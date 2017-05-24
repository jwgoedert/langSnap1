import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDecksPage } from './my-decks';

@NgModule({
  declarations: [
    MyDecksPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDecksPage),
  ],
  exports: [
    MyDecksPage
  ]
})
export class MyDecksPageModule {}
