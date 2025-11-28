import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { UserActivity } from '../types';
import { fetchUserActivity } from '../api';
import MatchCard from '../components/MatchCard';

type TabType = 'lost' | 'found';

export default function MatchesView() {
  const [activeTab, setActiveTab] = useState<TabType>('lost');
  const [activity, setActivity] = useState<UserActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUserActivity();
      setActivity(data);
    } catch (error) {
      console.error('Error loading activity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">Unable to load activity. Please try again.</p>
      </div>
    );
  }

  const items = activeTab === 'lost' ? activity.lostItems : activity.foundItems;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          My Matches & Activity
        </h1>
        <p className="text-lg text-gray-600">
          View your reported items and see potential matches from our AI system.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('lost')}
            className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
              activeTab === 'lost'
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Lost items I reported ({activity.lostItems.length})
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
              activeTab === 'found'
                ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Found items I reported ({activity.foundItems.length})
          </button>
        </div>
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">
            You haven't reported any {activeTab} items yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item) => {
            const itemMatches = activity.matches[item.id] || [];

            return (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  {/* Item Details */}
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <img
                      src={item.imageUrl}
                      alt={item.description}
                      className="w-full md:w-48 h-48 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.type === 'lost'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {item.type === 'lost' ? 'Lost' : 'Found'}
                        </span>
                        <span className="text-sm text-gray-500">{item.when}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.description}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        📍 {item.where}
                        {item.specificPlace && ` • ${item.specificPlace}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        Reported on {item.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Matches Section */}
                  {itemMatches.length > 0 && (
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        AI Matches ({itemMatches.length})
                      </h4>
                      <div className="space-y-3">
                        {itemMatches.slice(0, 3).map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                      {itemMatches.length > 3 && (
                        <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
                          View all {itemMatches.length} matches
                        </button>
                      )}
                    </div>
                  )}

                  {itemMatches.length === 0 && (
                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-sm text-gray-500 text-center">
                        No matches found yet. Check back later for updates.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
