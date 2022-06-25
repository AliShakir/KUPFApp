import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTabComponent } from './search-tab/search-tab.component';



@NgModule({
  declarations: [
    SearchTabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchTabComponent
  ]
})
export class SearchTabModule { }
