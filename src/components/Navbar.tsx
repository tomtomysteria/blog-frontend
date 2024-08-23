"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { token, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== null) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <nav className="flex justify-between p-4 bg-gray-800 text-white">
        <div>
          <span className="text-lg font-bold">Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <div>
        <Link href="/">
          <span className="text-lg font-bold">Home</span>
        </Link>
      </div>
      <div>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link href="/login">
            <span className="text-lg">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
