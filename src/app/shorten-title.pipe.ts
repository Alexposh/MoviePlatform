import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(value: string, ...args: number[]): unknown {
    // console.log('args are: ', args);
    return value.substring(0, args[0]);
  }

}
