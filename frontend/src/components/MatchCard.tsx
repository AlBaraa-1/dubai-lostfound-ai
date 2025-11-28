import { Match } from '../types';

interface MatchCardProps {
  match: Match;
  onViewDetails?: () => void;
}

export default function MatchCard({ match, onViewDetails }: MatchCardProps) {
  const { item, similarity, status } = match;

  const statusConfig = {
    possible: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Possible match' },
    high: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'High match' },
    exact: { bg: 'bg-green-100', text: 'text-green-800', label: 'Exact match' },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex gap-4">
        <img
          src={item.imageUrl}
          alt={item.description}
          className="w-24 h-24 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.type === 'lost'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {item.type === 'lost' ? 'Lost' : 'Found'} item
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
              {config.label} • {similarity}%
            </span>
          </div>
          <p className="text-sm text-gray-800 font-medium mb-1 truncate">
            {item.description}
          </p>
          <p className="text-xs text-gray-600 mb-2">
            📍 {item.where}
            {item.specificPlace && ` • ${item.specificPlace}`}
          </p>
          <p className="text-xs text-gray-500">🕐 {item.when}</p>
        </div>
      </div>
      {onViewDetails && (
        <button
          onClick={onViewDetails}
          className="mt-3 w-full text-sm text-blue-600 hover:text-blue-800 font-medium py-2 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
        >
          View details
        </button>
      )}
    </div>
  );
}
