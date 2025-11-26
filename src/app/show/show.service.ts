import { httpResource } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { ShowDetailsState } from './show.model';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ShowService {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private readonly id = computed(() => {
    this.router.lastSuccessfulNavigation();
    return this.route.snapshot.params['id'];
  });

  readonly state = httpResource<ShowDetailsState>(
    () => `https://www.episodate.com/api/show-details?q=${this.id()}`,
  );
}
