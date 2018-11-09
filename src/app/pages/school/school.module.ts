import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { SchoolRoutingModule } from './school-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SchoolRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [
    ListComponent
  ],
  exports: [
    ListComponent
  ]
})
export class SchoolModule {}
