import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DateInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  

})
export class FormsModule { 
  
}
