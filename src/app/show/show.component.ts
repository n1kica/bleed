import { Component, computed, inject, Signal } from '@angular/core';
import { ShowSummaryComponent } from './ui/show-summary.component';
import { ShowService } from './show.service';
import { FavoritesService } from '../shared/favorites.service';
import { TVShow } from './show.model';

@Component({
  selector: 'app-show',
  imports: [ShowSummaryComponent],
  providers: [ShowService],
  template: `
    <h1>Welcome to TV Show Page!</h1>

    @if (ss.state.error()) {
      <div>Could not load resource information</div>
    } @else if (ss.state.isLoading()) {
      <div>Loading resource info...</div>
    } @else if (show(); as show) {
      <app-show-summary [show]="show" (toggle)="fs.update($event)" />
    }
  `,
})
export class ShowComponent {
  protected readonly ss = inject(ShowService);
  protected readonly fs = inject(FavoritesService);

  protected readonly show: Signal<TVShow | undefined> = computed(() => {
    const show = this.ss.state.value()?.tvShow;
    return (
      show && {
        ...show,
        favorite: this.fs.favorites()?.includes(show.id),
      }
    );
  });
}
