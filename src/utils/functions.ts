import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const parseErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
): string => {
  if (error) {
    if ('status' in error) {
      if ('error' in error) {
        return error.error;
      }
      return JSON.stringify(error.data);
    }
  }
  return 'Some error happened';
};

export const parseErrorStatus = (
  error: FetchBaseQueryError | SerializedError | undefined,
): number | string => {
  if (error) {
    if ('status' in error) {
      return error.status;
    }
    return JSON.stringify(error.code);
  }
  return 'Error status is unknown';
};
