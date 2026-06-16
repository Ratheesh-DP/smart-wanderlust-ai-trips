import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                Smart-Wanderlust
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Travel Planning
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Create personalized travel itineraries in minutes. Get smart recommendations,
            optimized routes, and accurate budget forecasts for your next adventure.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register" className="btn-primary text-lg">
              Start Planning
            </Link>
            <Link href="/demo" className="btn-secondary text-lg">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Itinerary Generator</h3>
              <p className="text-gray-600">
                GPT-4 powered itinerary creation based on your preferences and interests.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗺️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Route Optimization</h3>
              <p className="text-gray-600">
                TSP solver for optimal travel routes between attractions.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Budget Forecasting</h3>
              <p className="text-gray-600">
                ML-based cost prediction and spending recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Tell Us Your Style', desc: 'Share your travel preferences and interests.' },
              { step: 2, title: 'AI Creates Your Trip', desc: 'Our AI generates a personalized itinerary.' },
              { step: 3, title: 'Optimize Your Route', desc: 'We optimize your travel path for efficiency.' },
              { step: 4, title: 'Book & Go', desc: 'Review, book, and enjoy your trip!' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2025 Smart-Wanderlust. Built with AI for intelligent travel planning.
          </p>
        </div>
      </footer>
    </main>
  );
}
