import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PriceSheetPageRoutingModule } from './price-sheet-routing.module';

import { PriceSheetPage } from './price-sheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PriceSheetPageRoutingModule
  ],
  declarations: [PriceSheetPage]
})
export class PriceSheetPageModule {}
