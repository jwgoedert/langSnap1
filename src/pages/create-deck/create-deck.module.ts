import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDeckPage } from './create-deck';

@NgModule({
  declarations: [
    CreateDeckPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDeckPage),
  ],
  exports: [
    CreateDeckPage
  ]
})
export class CreateDeckPageModule {}
