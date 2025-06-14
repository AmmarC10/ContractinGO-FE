import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface SignInData {
    email: string;
    password: string;
}

interface AuthResponse {
    success?: boolean;
    error?: string;
    data?: {
        'uid': string,
        'email': string,
        'displayName': string,
        'token': string
    };
}

const API_BASE_URL = "http://127.0.0.1:8000"

export const authService = {
    async signUp(data: SignUpData): Promise<AuthResponse> {
        
        const response = await fetch(`${API_BASE_URL}/firebase_auth/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });

            const result = await response.json();
            return result;
    },

    async gmailSignUp(): Promise<AuthResponse> {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const response = await fetch(`${API_BASE_URL}/firebase_auth/gmailSignUp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    token: await result.user.getIdToken(),
                    email: result.user.email,
                    displayName: result.user.displayName
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Authentication failed'
            };
        }
    },

    async signIn(data: SignInData): Promise<AuthResponse> {
        const response = await fetch(`${API_BASE_URL}/firebase_auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    },

    async signOut() {
        await signOut(auth);
        localStorage.removeItem('token');
    }
}