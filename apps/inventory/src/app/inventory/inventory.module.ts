import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: InventoryComponent, children: [] },
];

@NgModule({
  declarations: [InventoryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class InventoryModule {}
