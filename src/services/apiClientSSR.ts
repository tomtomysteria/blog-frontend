import { createBaseApiClient } from './apiClientBase';
import { getStoredItem } from '../utils/cookiesUtils.server';

export const createApiClientSSR = (withAuth: boolean = true) => {
  return createBaseApiClient(getStoredItem, withAuth);
};
