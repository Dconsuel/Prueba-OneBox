import { Pipe, PipeTransform } from '@angular/core';
import { Session } from '../models/events-info.model';

@Pipe({
  name: 'OrderBy'
})
export class OrderbyPipe implements PipeTransform {

  transform(sessions: Session[] | undefined, order: 'asc' | 'desc' = 'asc'): Session[] | undefined {
    if (!sessions) {
      return undefined;
    }
    return sessions.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));

      if (order === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }

}
