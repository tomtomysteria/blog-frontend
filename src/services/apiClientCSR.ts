import { createBaseApiClient } from './apiClientBase';
import { getStoredItem } from '../utils/cookiesUtils.client';

export const createApiClientCSR = (withAuth: boolean = true) => {
  return createBaseApiClient(getStoredItem, withAuth);
};
