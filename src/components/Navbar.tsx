"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { token, logout } = useAuth();

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
