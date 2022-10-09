import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoryComponent } from './category.component';

const routes: Routes = [
   {
      path: ':id' , component : CategoryComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,SharedModule]
})
export class CategoryRoutingModule { }
