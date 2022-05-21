import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unicodeFriendly'
})
export class UnicodeFriendlyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return decodeURIComponent(JSON.parse('"' + value.replace(/\"/g, '\\"') + '"'));
  }

}
