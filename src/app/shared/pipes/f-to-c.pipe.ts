import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fToC'
})
export class FToCPipe implements PipeTransform {

  transform(value: number | undefined, ...args: unknown[]): unknown {
    if (!value) return
    let fTemp : number= value ;
    let fToCel = (fTemp - 32) * 5 / 9;
    const f = fTemp+' \xB0F'
    const c = fToCel.toFixed(2) +' \xB0C'
    return args[0]? f: c;
  }

}
