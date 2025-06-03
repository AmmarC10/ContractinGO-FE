'use client';

export const Header = () => {

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between py-3 px-4">
                {/* Logo/Title */}
                <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-800">ContractinGO</span>
                    {/* You can add a logo image here if you have one */}
                </div>

                {/* Navigation and Sign Up */}
                <div className="flex items-center gap-6">
                    {/* Sign Up Button */}
                    <button className="ml-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded transition-colors">
                        Sign up
                    </button>
                </div>
            </div>
        </header>
    );
}