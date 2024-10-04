import { AxiosError } from 'axios';

export class CustomError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    // Vérifie si le statut est déjà présent dans le message pour éviter la duplication
    const formattedMessage = message.includes(`Status: ${status}`)
      ? message
      : `Status: ${status} - ${message}`;

    super(formattedMessage); // Appelle le constructeur de la classe Error avec le message formaté
    this.status = status;

    // Assure que le nom de l'erreur est "CustomError"
    this.name = this.constructor.name;

    // Capture la stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleError(
  error: AxiosError | any,
  defaultMessage: string = 'An error occurred. Please try again.',
) {
  handleErrorLog(error);

  let statusCode;
  let errorMessage;

  if (error.response) {
    statusCode = error.response.status;
    errorMessage = error.response.data?.message;
  } else if (error.status) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  // Créer un objet d'erreur structuré
  const errorObj = {
    status: statusCode || 500,
    message: errorMessage || defaultMessage,
  };

  throw new CustomError(errorObj.status, errorObj.message);
}

export function handleErrorLog(error: AxiosError | any) {
  if (error.isAxiosError && error.response) {
    console.error('Request failed:', error.response.data);
  } else if (error.message) {
    console.error('Request failed:', error.message);
  }
}

export function logFormErrors(errors: Record<string, any>) {
  if (Object.keys(errors).length > 0) {
    console.log('Form validation errors:', errors);
  }
}
