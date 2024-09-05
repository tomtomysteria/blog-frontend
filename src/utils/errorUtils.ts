import { AxiosError } from 'axios';

export function handleAxiosError(
  error: AxiosError | any,
  defaultMessage: string = 'An error occurred. Please try again.',
) {
  handleAxiosLog(error);

  // Lever une nouvelle erreur avec un message approprié
  throw new Error(error.response?.data?.message || defaultMessage);
}

export function handleAxiosLog(error: AxiosError | any) {
  if (error.isAxiosError && error.response) {
    console.error('Request failed:', error.response.data);
  } else {
    console.error('Request failed:', error.message);
  }
}
