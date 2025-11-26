import { TVShow } from '../show/show.model';

export type SearchEvent = {
  type: 'search' | 'next' | 'prev' | 'reset';
  query?: string;
};

export interface SearchState {
  page?: number;
  pages?: number;
  total?: number;
  tv_shows?: TVShow[];
}
