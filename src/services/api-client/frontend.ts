import axios from 'axios';
import { baseURLFrontend } from '../config';

export const apiClient = axios.create({
  baseURL: baseURLFrontend,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Assure l'envoi des cookies
});
