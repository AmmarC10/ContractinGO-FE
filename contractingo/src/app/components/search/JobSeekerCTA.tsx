'use client';
import Link from 'next/link'

export const JobSeekerCTA = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 mt-12">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-3">
                    Ready to Start Your ContractinGO Journey?
                </h2>
                <p className="text-xl text-green-50 mb-6">
                    Join thousands of skilled workers who found their dream jobs in Canada
                </p>
                <Link 
                    href="/users/signup"
                    className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer transform hover:scale-105 shadow-md hover:shadow-lg">
                    Sign Up Now - It&apos;s Free
                </Link>
                <p className="text-green-50 mt-4 text-sm">
                    ✓ Quick and easy registration
                    <span className="mx-2">•</span>
                    ✓ Access to top employers
                    <span className="mx-2">•</span>
                    ✓ Personalized job matches
                </p>
            </div>
        </div>
    );
}; 