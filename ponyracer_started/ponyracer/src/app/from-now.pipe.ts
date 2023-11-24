import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const date = parseISO(value);

    const distance = formatDistanceToNowStrict(date, { addSuffix: true });

    return distance;
  }
}
