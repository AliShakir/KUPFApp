import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLabels'
})
export class FilterLabelsPipe implements PipeTransform {
  transform(items: any[], args: any[]): unknown {
    return items.filter(item => item.id.indexOf(args[0]) !== -1);
  }

}
