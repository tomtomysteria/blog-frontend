'use client';

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Il n'y a pas besoin d'être authentifié pour accéder à l'ensemble des pages publiques existantes.
  // Logique de vérification et/ou de redirection à mettre en place par la suite si ça devient le cas.
  return <>{children}</>;
}
