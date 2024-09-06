import { createBaseApiClient } from './apiClientBase';
import { getStoredItem, setStoredItem } from '@/utils/cookiesUtils.client';

export const createApiClientCSR = (withAuth: boolean = true) => {
  return createBaseApiClient(getStoredItem, setStoredItem, withAuth);
};
