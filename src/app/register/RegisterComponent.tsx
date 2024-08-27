"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createUser } from '../../services/api';

type FormValues = {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    role: string; 
    birthdate?: string;
};

const RegisterComponent: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await createUser({ ...data, role: 'blogger' }); // Ajouter le rôle par défaut ici
            router.push('/login');
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>First Name:</label>
                <input {...register('firstname', { required: 'First name is required' })} />
                {errors.firstname && <p>{errors.firstname.message}</p>}
            </div>
            <div>
                <label>Last Name:</label>
                <input {...register('lastname', { required: 'Last name is required' })} />
                {errors.lastname && <p>{errors.lastname.message}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input {...register('email', { 
                    required: 'Email is required', 
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' } 
                })} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>Username:</label>
                <input {...register('username', { required: 'Username is required' })} />
                {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    {...register('password', { 
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Password must include uppercase, lowercase, number, and special character'
                        }
                    })} 
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <label>Birthdate (optional):</label>
                <input type="date" {...register('birthdate')} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterComponent;
