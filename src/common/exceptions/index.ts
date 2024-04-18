import { ExceptionFilter } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationFilter } from './validation.filter';
export * from './http-exception.filter'
export const getGlobalFilters = (
    httpAdapter: HttpAdapterHost,
  ): ExceptionFilter<any>[] => [
    new HttpExceptionFilter(httpAdapter),
    new ValidationFilter(),
  ];