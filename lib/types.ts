import type { PaginatedDocs } from 'payload';


export type Populated<T, K extends keyof T> = {
  [P in keyof T]: P extends K
    ? (T[P] extends Array<unknown> ? (Extract<T[P][number], object>)[] : Extract<T[P], object>)
    : T[P]
};
export type PopulatedPaginatedDocs<T extends PaginatedDocs, K extends keyof T['docs'][number]> = PaginatedDocs<Populated<T['docs'][number], K>>;


export interface PayloadOptions {
  sort?: string;
  pagination?: boolean;
  limit?: number;
  page?: number;
}
