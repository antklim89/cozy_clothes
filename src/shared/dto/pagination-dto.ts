import type { PaginatedDocs } from 'payload';
import type { PaginatedData } from '../model/types';


export function paginationDto<T, U>(data: PaginatedDocs<U>, dto: (args: U) => T): PaginatedData<T> {
  return {
    page: data.page ?? 1,
    totalPages: data.totalPages,
    docs: data.docs.map(dto),
  };
}
