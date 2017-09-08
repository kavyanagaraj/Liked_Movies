//Custom filter pipe to filter the movies matching the movie title and the searchtext
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], search_text: string): any[] {
    if(!items) return [];   
    //Checking for search text length to filter
    if(!search_text || search_text.length < 2) return items;
    search_text = search_text.toLowerCase();
    //Filters all the items whose title includes the search text
    return items.filter( item => {
      return item.title.toString().toLowerCase().includes(search_text);
    });
   }
}