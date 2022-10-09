import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinkModule } from 'ngx-quicklink';

import { CategoryRoutingModule } from './category-routing.module';

import { CategoryComponent } from './category.component';

@NgModule({
   declarations: [
      CategoryComponent
   ],
   imports: [
      CommonModule,
      CategoryRoutingModule,
      QuicklinkModule
   ]
})
export class CategoryModule { }
