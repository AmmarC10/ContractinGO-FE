'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/layout';
import { GoogleSignUpButton } from '@/app/components/auth';
import { authService } from '@/app/services/auth';

// Data for form
interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    submit?: string;
}

export default function SignUp (){
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });
    // State to track errors
    const [errors, setErrors] = useState<FormErrors>({});
    // State to track loading after submission
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Email validation
        if(!formData.email){
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if(!formData.password){
            newErrors.password = 'Password is required';
        } else if(formData.password.length < 8){
            newErrors.password = 'Password must be at least 8 characters'
        } // TODO: more validation


        if(formData.confirmPassword !== formData.password){
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Name validation
        if (!formData.firstName) {
            newErrors.firstName = 'First name is required'
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required'
        }

        // Set the errors to errors logged 
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }

        setIsLoading(true);
        try {
            const result = await authService.signUp({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName
            });

            if(!result.success) {
                throw new Error(result.error);
            }

            if(result.data?.token) {
                localStorage.setItem('token', result.data?.token);
            }

            router.push("/");

        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: error instanceof Error ? error.message  : 'Error Occured during signup'
            }));
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex flex-col items-center py-8 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full space-y-6">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                    </div>
                    {errors.submit && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                            <span className="block sm:inline">{errors.submit}</span>
                        </div>
                    )}
                    <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-lg font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="mt-2 appearance-none rounded-lg relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                                            placeholder="First Name"
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-base text-red-600">{errors.firstName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-lg font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="mt-2 appearance-none rounded-lg relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                                            placeholder="Last Name"
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-base text-red-600">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-2 appearance-none rounded-lg relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                                        placeholder="Email address"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-base text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="mt-2 appearance-none rounded-lg relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                                            placeholder="Password"
                                        />
                                        {errors.password && (
                                            <p className="mt-1 text-base text-red-600">{errors.password}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="mt-2 appearance-none rounded-lg relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                                            placeholder="Confirm Password"
                                        />
                                        {errors.confirmPassword && (
                                            <p className="mt-1 text-base text-red-600">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-xl font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-8 relative max-w-2xl w-full">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-50 text-gray-500">OR</span>
                    </div>
                </div>
                <div className="mt-4 max-w-2xl w-full">
                    <GoogleSignUpButton/>
                </div>
            </div>
        </main>
    )
}