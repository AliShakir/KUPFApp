import { Pipe, PipeTransform } from '@angular/core';
import { __values } from 'tslib';
import { FormTitleDt } from '../../models/formTitleDt';

@Pipe({
  name: 'filterLabels'
})
export class FilterLabelsPipe implements PipeTransform {
  
  transform(items: FormTitleDt[],searchTerm:string): any {  
      
    
    const langId:number  = JSON.parse(localStorage.getItem('langType')!);
    console.log(langId);
    for(let i = 0; i < items.length; i++)
    {     
      
      //const values = items.filter((c: {LabelId: string;Language: string;}) => c.LabelId === searchTerm && c.Language == langId);      
      const arr = items.filter(c=>c.labelId == searchTerm && c.language == langId );
         
      return arr;
    }    
}

}
