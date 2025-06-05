'use client';

export const HeroSearch = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 pt-20">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Find Your Perfect Match
                </h1>
                <p className="text-xl text-gray-600">
                    Looking for skilled workers in Canada? Start your search below
                </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search for skills, job titles, or locations..."
                            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                        />
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors cursor-pointer flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}; 