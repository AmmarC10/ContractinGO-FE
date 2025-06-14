'use client';
import { auth } from '@/app/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LogOut } from '../auth/LogOut';

export const Header = () => {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setisAuthenticated(!!user);
            setIsLoading(false);
        })

        return () => unsubscribe();
    }, []);

    return (
        <header className="bg-white border-b border-green-200">
            <div className="flex items-center justify-between py-3 px-4">
                {/* Logo/Title */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-4xl font-bold text-gray-800">ContractinGO</Link>
                    <span className="text-xl text-gray-600 font-medium italic border-l-2 border-green-200 pl-4">
                        finding work in Canada made easy
                    </span>
                </div>

                {/* Navigation and Sign Up */}
                <div className="flex items-center gap-6">
                    {isLoading ? (
                        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                    ) : isAuthenticated ? (
                        <LogOut />
                    ) : (
                        <>
                            {/* Login Button */}
                            <Link 
                                href="/users/login"
                                className="bg-white hover:bg-gray-50 text-green-600 hover:text-green-700 font-semibold px-5 py-2 rounded transition-colors text-1xl hover:border-green-600 cursor-pointer border border-green-600"
                            >
                                Login
                            </Link>
                            {/* Sign Up Button */}
                            <Link 
                                href="/users/signup"
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded transition-colors text-1xl cursor-pointer"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}