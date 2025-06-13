'use client';
import { useRouter } from 'next/navigation';
import { authService } from '@/app/services/auth';
import { useState, useRef } from 'react';

export const GoogleSignUpButton = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const popupPromiseRef = useRef<Promise<any> | null>(null);

    const handleGoogleSignUp = async () => {
        if (popupPromiseRef.current) return; // Prevent multiple popups
        
        setIsLoading(true);
        try {
            // Store the popup promise in the ref
            popupPromiseRef.current = authService.gmailSignUp();
            const result = await popupPromiseRef.current;
            
            if(!result.success){
                throw new Error(result.error);
            }

            if(result.data?.token) {
                localStorage.setItem('token', result.data?.token);
                router.push('/');
            }
        } finally {
            // Clear the popup promise ref and loading state
            popupPromiseRef.current = null;
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <button
                onClick={handleGoogleSignUp}
                disabled={isLoading || popupPromiseRef.current !== null}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-200 rounded-lg px-8 py-3.5 font-semibold shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
                ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                )}
                {isLoading ? 'Signing in...' : 'Continue with Google'}
            </button>
        </div>
    );
}