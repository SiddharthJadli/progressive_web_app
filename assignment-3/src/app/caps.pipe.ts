import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caps'
})
export class CapsPipe implements PipeTransform {

  transform(value: string): string {
    if(value) {
      return value.toUpperCase();
    }
    return '';
  }

}
// <p>{{  | caps }}</p>
