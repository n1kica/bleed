import { httpResource } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { SearchState } from './search.model';

@Injectable()
export class SearchService {
  search: WritableSignal<string> = signal('');
  next: Signal<void> = signal(null);
  prev: Signal<void> = signal(null);
  reset: Signal<void> = signal(null);

  readonly state = httpResource<SearchState>(
    () => `https://www.episodate.com/api/search?${this.search()}page=1`,
  );
}
