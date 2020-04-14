import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propFilter'
})
export class PropFilterPipe implements PipeTransform {

  transform(value: any[], prop: string, shouldMatch: boolean | null = null): any[] {
    if(shouldMatch === null) return value;
    if(shouldMatch) {
      return value.filter(one => one[prop]);
    } else {
      return value.filter(one => !one[prop]);
    }
  }

}
