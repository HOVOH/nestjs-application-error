import { applyDecorators, UseFilters } from '@nestjs/common';
import { ApplicationErrorsFilter } from './application-errors.filter';

export function CatchApplicationError(codes: { [key: string]: number }) {
  return applyDecorators(UseFilters(new ApplicationErrorsFilter(codes)));
}
