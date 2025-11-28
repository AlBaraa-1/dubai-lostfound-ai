import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Item, Match } from '../types';
import { fetchHistory, buildImageUrl, HistoryResponse, ItemInDBBase } from '../api/lostFoundApi';
import MatchCard from '../components/MatchCard';

type TabType = 'lost' | 'found';

// Helper function to convert backend item to frontend Item type
const convertToItem = (dbItem: ItemInDBBase, type: 'lost' | 'found'): Item => ({
  id: dbItem.id.toString(),
  type,
  imageUrl: buildImageUrl(dbItem.image_url),
  where: dbItem.location_type || 'Unknown',
  specificPlace: dbItem.location_detail || undefined,
  when: dbItem.time_frame || 'Unknown',
  description: dbItem.description || dbItem.title || 'No description',
  timestamp: new Date(dbItem.created_at),
});

export default function MatchesView() {
  const [activeTab, setActiveTab] = useState<TabType>('lost');
  const [lostItems, setLostItems] = useState<Item[]>([]);
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [matches, setMatches] = useState<Record<string, Match[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadActivity();
  }, []);

  const loadActivity = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchHistory();
      
      // Convert backend items with matches to frontend format
      const convertedLostItems = data.lost_items.map(itemWithMatches => 
        convertToItem(itemWithMatches.item, 'lost')
      );
      const convertedFoundItems = data.found_items.map(itemWithMatches => 
        convertToItem(itemWithMatches.item, 'found')
      );
      
      setLostItems(convertedLostItems);
      setFoundItems(convertedFoundItems);
      
      // Build matches map from the backend response
      const matchesMap: Record<string, Match[]> = {};
      
      data.lost_items.forEach(itemWithMatches => {
        const itemId = itemWithMatches.item.id.toString();
        matchesMap[itemId] = itemWithMatches.matches
          .filter(matchResult => matchResult.similarity >= 0.5)
          .map(matchResult => ({
          id: matchResult.item.id.toString(),
          item: {
            id: matchResult.item.id.toString(),
            type: 'found' as const,
            imageUrl: buildImageUrl(matchResult.item.image_url),
            where: matchResult.item.location_type || 'Unknown',
            specificPlace: matchResult.item.location_detail || undefined,
            when: matchResult.item.time_frame || 'Unknown',
            description: matchResult.item.description || matchResult.item.title || 'No description',
            timestamp: new Date(matchResult.item.created_at),
          },
          similarity: Math.round(matchResult.similarity * 100),
          status: (matchResult.similarity >= 0.75 ? 'high' : 'possible') as 'possible' | 'high' | 'exact',
        }));
      });
      
      data.found_items.forEach(itemWithMatches => {
        const itemId = itemWithMatches.item.id.toString();
        matchesMap[itemId] = itemWithMatches.matches
          .filter(matchResult => matchResult.similarity >= 0.5)
          .map(matchResult => ({
          id: matchResult.item.id.toString(),
          item: {
            id: matchResult.item.id.toString(),
            type: 'lost' as const,
            imageUrl: buildImageUrl(matchResult.item.image_url),
            where: matchResult.item.location_type || 'Unknown',
            specificPlace: matchResult.item.location_detail || undefined,
            when: matchResult.item.time_frame || 'Unknown',
            description: matchResult.item.description || matchResult.item.title || 'No description',
            timestamp: new Date(matchResult.item.created_at),
          },
          similarity: Math.round(matchResult.similarity * 100),
          status: (matchResult.similarity >= 0.75 ? 'high' : 'possible') as 'possible' | 'high' | 'exact',
        }));
      });
      
      setMatches(matchesMap);
    } catch (error) {
      console.error('Error loading activity:', error);
      setError(error instanceof Error ? error.message : 'Unable to load activity');
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

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-700 text-lg mb-3">{error}</p>
          <button
            onClick={loadActivity}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const items = activeTab === 'lost' ? lostItems : foundItems;

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
            Lost items I reported ({lostItems.length})
          </button>
          <button
            onClick={() => setActiveTab('found')}
            className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
              activeTab === 'found'
                ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Found items I reported ({foundItems.length})
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
            const itemMatches = matches[item.id] || [];

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
