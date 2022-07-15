import { Pipe, PipeTransform } from '@angular/core';
import { __values } from 'tslib';
import { FormTitleDt } from '../../models/formTitleDt';

@Pipe({
  name: 'filterLabels'
})
export class FilterLabelsPipe implements PipeTransform {
  
  transform(items: FormTitleDt[],searchTerm:string): any {  
      
    
    const langId:number  = JSON.parse(localStorage.getItem('langType')!);
    for(let i = 0; i < items.length; i++)
    {  
      const values = items.filter(c=>c.labelId == searchTerm && c.language == langId );        
      return values;
    }    
}

}
