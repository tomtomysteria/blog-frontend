import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginComponent: React.FC = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const { login, token, role } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await loginUser(identifier, password);
            login(data.token, data.role); // Storing the JWT token and user role in context
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Effect to handle redirection based on role after successful login
    useEffect(() => {
        if (token && role) {
            if (role === 'super-admin' || role === 'admin') {
                router.push('/admin'); // Redirect to admin page for super-admin and admin roles
            } else if (role === 'blogger') {
                router.push('/'); // Redirect to home page for blogger role
            }
        }
    }, [token, role, router]);

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
            <p>
                Don't have an account? <Link href="/register">Sign up here</Link>
            </p>
        </form>
    );
};

export default LoginComponent;
