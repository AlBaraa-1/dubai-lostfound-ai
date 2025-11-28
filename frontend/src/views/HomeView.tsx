import { Search, Upload, Sparkles, Users, Shield, Eye, MapPin } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: 'report-lost' | 'report-found') => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          AI-Powered Lost & Found for Dubai
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 px-4">
          When someone loses an item in Dubai—whether a wallet, headphones, or a bag—they
          shouldn't have to visit multiple desks or apps. Dubai AI Lost & Found uses computer
          vision to match photos of lost and found items, with privacy-first design and a
          simple, city-wide experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onNavigate('report-lost')}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            I lost an item
          </button>
          <button
            onClick={() => onNavigate('report-found')}
            className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            I found an item
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">Step 1</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Photo</h3>
            <p className="text-gray-600">Take a photo of the lost or found item.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">Step 2</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Add Where & When</h3>
            <p className="text-gray-600">Select where and when it was lost or found.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">Step 3</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Matches</h3>
            <p className="text-gray-600">Our AI compares your photo against existing posts.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">Step 4</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Connect</h3>
            <p className="text-gray-600">If there's a match, you can coordinate a safe return.</p>
          </div>
        </div>
      </section>

      {/* Why Dubai Needs This Section */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Dubai Needs This
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">City-wide, not per-venue</h3>
            <p className="text-gray-700">
              One unified platform for all of Dubai, instead of separate systems for malls,
              taxis, metros, and airports.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Real visual AI, not manual scrolling</h3>
            <p className="text-gray-700">
              Computer vision matches items automatically—no need to browse through hundreds of
              text descriptions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy-first design</h3>
            <p className="text-gray-700">
              Built for residents and tourists with automatic face and ID blurring to protect
              personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-600">
          Prototype for Create Apps Championship – Dubai Chamber of Digital Economy
        </p>
      </footer>
    </div>
  );
}
