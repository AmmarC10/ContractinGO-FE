interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
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
    }
}