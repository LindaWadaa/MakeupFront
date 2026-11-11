import { Pipe, PipeTransform } from '@angular/core';
import { Makeup } from '../model/makeup.model';

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
  transform(makeups: Makeup[] | null | undefined, filterText: string | null | undefined): Makeup[] {
    const normalizedFilter = (filterText ?? '').trim().toLowerCase();

    if (!makeups || !normalizedFilter) {
      return makeups ?? [];
    }

    return makeups.filter(makeup => (makeup.nom ?? '').toLowerCase().includes(normalizedFilter));
  }
}
