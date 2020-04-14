import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByProp'
})
export class SearchByPropPipe implements PipeTransform {

  transform(value: any[], prop: string, search?: string): any[] {
    if(!search) return value;
    search = search.trim().toLowerCase();
    if(!search.length) return value;
    return value.filter(one => one[prop].indexOf(search) !== -1);
  }

}
