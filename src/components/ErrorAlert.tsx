import { Alert, AlertTitle, AlertDescription } from './ui/alert';

type ErrorAlertProps = {
  message?: string;
};

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <Alert variant="destructive" className="mt-10">
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription>
        {message ||
          'Il y a des erreurs dans le formulaire. Veuillez vérifier les champs indiqués.'}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
