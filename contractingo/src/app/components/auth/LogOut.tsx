'use client';

import { auth } from "@/app/lib/firebase";
import { authService } from "@/app/services/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LogOut = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        try {
            authService.signOut();
            router.push("/");
        }  finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="bg-white hover:bg-gray-50 text-green-600 hover:text-green-700 font-semibold px-5 py-2 rounded transition-colors text-1xl cursor-pointer border border-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
            {isLoading ? (
                <>
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                    Signing out...
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 4.158a.75.75 0 11-1.06 1.06l-5.5-5.5a.75.75 0 010-1.06l5.5-5.5a.75.75 0 111.06 1.06L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                    </svg>
                    Sign Out
                </>
            )}
        </button>
    );
}