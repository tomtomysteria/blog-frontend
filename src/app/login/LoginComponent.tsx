import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginComponent: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, accessToken, role } = useAuth(); // Récupérer la fonction login et les tokens
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Appel à la fonction `login` du contexte pour effectuer la connexion
      await login(identifier, password);
      // La gestion des tokens et du rôle est effectuée dans le contexte
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Redirection si l'utilisateur est déjà connecté
  useEffect(() => {
    if (accessToken && role) {
      if (role === 'super-admin' || role === 'admin') {
        router.push('/admin'); // Redirection pour les admins
      } else if (role === 'blogger') {
        router.push('/'); // Redirection pour les bloggers
      }
    }
  }, [accessToken, role, router]);

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username or Email:</label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p>
        Don't have an account? <Link href="/register">Sign up here</Link>
      </p>
    </form>
  );
};

export default LoginComponent;
