// Este es un pipe personalizado llamado OrderbyPipe, que implementa la interfaz PipeTransform

import { Pipe, PipeTransform } from '@angular/core';
import { Session } from '../models/events-info.model';

@Pipe({
  name: 'OrderBy'
})
export class OrderbyPipe implements PipeTransform {
  // Este método transforma un arreglo de sesiones (sessions) y un orden (order), que puede ser 'asc' o 'desc'
  // Por defecto, el orden es 'asc' si no se proporciona un valor de orden

  transform(sessions: Session[] | undefined, order: 'asc' | 'desc' = 'asc'): Session[] | undefined {
    // Si no se proporciona un arreglo de sesiones (sessions), se retorna undefined
    if (!sessions) {
      return undefined;
    }

    // Si se proporciona un arreglo de sesiones (sessions), se ordena el arreglo de acuerdo al valor de orden (order)
    // El ordenamiento se realiza según la fecha de cada sesión (date)
    
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
