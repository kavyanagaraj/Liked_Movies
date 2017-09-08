//Custom decade filter pipe to filter the movies in the input decade
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'decadefilter'
})
export class DecadeFilterPipe implements PipeTransform {
  transform(items: any[], decade: any): any[] {
    if(!items) return [];
    if(!decade) return items;
    decade = parseInt(decade);
    //Filters items where items year is within a decade
    return items.filter( item => {
      return (item.year >= decade && item.year < decade+10);
    });
   }
}