import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceSheetPage } from './price-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: PriceSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceSheetPageRoutingModule {}
