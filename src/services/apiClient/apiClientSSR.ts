import { createBaseApiClient } from './apiClientBase';
import { getStoredItem, setStoredItem } from '@/utils/cookiesUtils.server';

export const createApiClientSSR = (withAuth: boolean = true) => {
  return createBaseApiClient(getStoredItem, setStoredItem, withAuth);
};
