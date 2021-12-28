import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateParse'
})
export class DateParsePipe implements PipeTransform {
  days: any =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  transform(value: string, ...args: unknown[]): string {
    let d = new Date(value);
    let dayName = this.days[d.getDay()];
    return dayName
  }

}
