import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const LoginRedirect: React.FC = () => {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (token) {
            router.push('/dashboard'); // Redirect to dashboard or another protected route
        }
    }, [token, router]);

    return null; // This component doesn't render anything visible
};

export default LoginRedirect;
