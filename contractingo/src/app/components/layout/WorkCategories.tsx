export const WorkCategories = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Moving Services */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4" role="img" aria-label="moving truck">
                        🚚
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Moving Services
                    </h3>
                    <p className="text-gray-600">
                        Professional moving and packing services for homes and businesses
                    </p>
                </div>

                {/* Snow Removal */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4" role="img" aria-label="snow">
                        ❄️
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Snow Removal
                    </h3>
                    <p className="text-gray-600">
                        Reliable snow clearing for driveways, walkways, and commercial properties
                    </p>
                </div>

                {/* Lawn Care */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4" role="img" aria-label="lawn mower">
                        🌱
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Lawn Care
                    </h3>
                    <p className="text-gray-600">
                        Professional lawn maintenance, mowing, and landscaping services
                    </p>
                </div>

                {/* Website Design */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4" role="img" aria-label="website design">
                        💻
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Website Design
                    </h3>
                    <p className="text-gray-600">
                        Professional website development and design for businesses and individuals
                    </p>
                </div>

                {/* Painting */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4" role="img" aria-label="painting">
                        🎨
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Painting
                    </h3>
                    <p className="text-gray-600">
                        Interior and exterior painting for residential and commercial spaces
                    </p>
                </div>

                {/* Plumbing */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4" role="img" aria-label="plumbing">
                        🔧
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Plumbing
                    </h3>
                    <p className="text-gray-600">
                        Expert plumbing repairs, installations, and maintenance services
                    </p>
                </div>

                {/* Electrical */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4" role="img" aria-label="electrical">
                        ⚡
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Electrical
                    </h3>
                    <p className="text-gray-600">
                        Licensed electrical work for homes and businesses
                    </p>
                </div>

                {/* Carpentry */}
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-4" role="img" aria-label="carpentry">
                        🪚
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Carpentry
                    </h3>
                    <p className="text-gray-600">
                        Custom woodwork, repairs, and construction services
                    </p>
                </div>
            </div>
        </div>
    );
}; 