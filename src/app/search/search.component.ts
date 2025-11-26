import { Component, computed, inject, Signal } from '@angular/core';
import { SearchService } from './search.service';
import { SearchBoxComponent } from './ui/search-box.component';
import { SearchResultsComponent } from './ui/search-results.component';
import { FavoritesService } from '../shared/favorites.service';
import { TVShow } from '../show/show.model';

@Component({
  selector: 'app-search',
  imports: [SearchBoxComponent, SearchResultsComponent],
  providers: [SearchService],
  template: `
    <h1>Welcome to Search Page!</h1>

    <app-search-box (search)="tvs.search.set($event)" />

    @if (tvs.state.error()) {
      <div>Could not load resource information</div>
    } @else if (tvs.state.isLoading()) {
      <div>Loading resource info...</div>
    } @else if (shows(); as shows) {
      <app-search-results [shows]="shows" (toggle)="favs.update($event)" />
    }
  `,
})
export class SearchComponent {
  protected readonly tvs = inject(SearchService);
  protected readonly favs = inject(FavoritesService);

  shows: Signal<TVShow[]> = computed(
    () =>
      this.tvs.state.value()?.tv_shows?.map((show) => ({
        ...show,
        favorite: this.favs.favorites()?.includes(show.id),
      })) ?? [],
  );
}
