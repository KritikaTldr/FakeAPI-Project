// import { Pipe, PipeTransform } from '@angular/core';
//
// @Pipe({
//   name: 'truncate',
//   standalone: true
// })
// export class TruncatePipe implements PipeTransform {
//
//   transform(value: string, limit: number): string {
//     if (!value) return '';
//     if (value.length <= limit) return value;
//     return value.substring(0, limit) + '…';
//   }
// }
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | number, limit: number): string {
    if (value === null || value === undefined) return '';

    if (typeof value === 'string') {
      if (value.length <= limit) return value;
      return value.substring(0, limit) + '…';
    } else if (typeof value === 'number') {
      return value.toFixed(limit);
    }

    return '';
  }
}
