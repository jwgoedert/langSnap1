import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDeckAddPage } from './edit-deck-add';

@NgModule({
  declarations: [
    EditDeckAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDeckAddPage),
  ],
  exports: [
    EditDeckAddPage
  ]
})
export class EditDeckAddPageModule {}
