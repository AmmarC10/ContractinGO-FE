'use client';

import { authService } from "@/app/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "@/app/components/layout";
import { GoogleSignUpButton } from "@/app/components/auth";

interface FormData {
    email: string;
    password: string;
}

interface FormErrors { 
    email?: string;
    password?: string;
    submit?: string;
}

export default function SignIn() {
    const router = useRouter();
    const [isLoading, setIsloading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Email validation
        if(!formData?.email){
            newErrors.email = 'Email is required';
        }  else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // password validation
        if(!formData?.password){
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignIn = async (e:React.FormEvent) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }

        setIsloading(true);
        try {
            const result = await authService.signIn({
                email: formData.email,
                password: formData.password
            });

            if(!result.success){
                throw new Error(result.error);
            }

            if(result.data?.token){
                localStorage.setItem('token', result.data?.token);
                router.push("/"); 
            }
    
        } catch(error) {
            setErrors(prev => ({
                ...prev,
                submit: error instanceof Error ? error.message  : 'Error Occured during signup'
            }));
        } finally {
            setIsloading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex flex-col items-center py-8 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-6">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-lg text-gray-600">
                            Sign in to your account
                        </p>
                    </div>

                    {errors.submit && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                            <span className="block sm:inline">{errors.submit}</span>
                        </div>
                    )}

                    <form onSubmit={handleSignIn} className="mt-8 space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className={`mt-2 appearance-none rounded-lg relative block w-full px-4 py-4 border ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg`}
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-base text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    className={`mt-2 appearance-none rounded-lg relative block w-full px-4 py-4 border ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg`}
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-base text-red-600">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-xl font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-50 text-gray-500">OR</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <GoogleSignUpButton />
                    </div>
                </div>
            </div>
        </main>
    );
}