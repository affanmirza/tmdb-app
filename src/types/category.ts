export type Category = 'now-playing' | 'popular' | 'top-rated' | 'upcoming';

export const categories: { id: Category | ''; name: string }[] = [
  { id: '', name: 'All Movies' },
  { id: 'now-playing', name: 'Now Playing' },
  { id: 'popular', name: 'Popular' },
  { id: 'top-rated', name: 'Top Rated' },
  { id: 'upcoming', name: 'Upcoming' },
]; 