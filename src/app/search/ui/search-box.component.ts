import { Component, output, signal } from '@angular/core';
import { form, Field, required, minLength } from '@angular/forms/signals';

interface SearchData {
  search: string;
}

@Component({
  selector: 'app-search-box',
  imports: [Field],
  template: `
    <form (submit)="onSubmit($event)" aria-labelledby="searchBoxLabel">
      <label id="searchBoxLabel" for="searchQuery" class="sr-only"> Search </label>

      <input
        id="searchQuery"
        [field]="searchForm.search"
        type="text"
        placeholder="Example"
        aria-required="true"
        [attr.aria-invalid]="searchForm.search().invalid()"
      />

      <button type="submit" [disabled]="searchForm.search().invalid()" aria-label="Search">
        SEARCH
      </button>
    </form>
  `,
})
export class SearchBoxComponent {
  search = output<string>();

  searchModel = signal<SearchData>({
    search: '',
  });

  searchForm = form(this.searchModel, (schemaPath) => {
    required(schemaPath.search);
    minLength(schemaPath.search, 3);
  });

  onSubmit(event: Event) {
    event.preventDefault();
    this.search.emit('q=' + this.searchForm.search().value() + '&');
  }
}
