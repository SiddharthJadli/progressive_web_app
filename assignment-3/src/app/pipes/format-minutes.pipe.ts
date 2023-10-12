import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMinutes'
})
export class FormatMinutesPipe implements PipeTransform {
  transform(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hr(s) ${remainingMinutes} min(s)`;
    }
  }
}
