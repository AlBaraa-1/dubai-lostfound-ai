import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { ItemFormData, Match } from '../types';
import { submitFoundItem } from '../api';
import MatchCard from '../components/MatchCard';

const whereOptions = [
  'Mall',
  'Taxi',
  'Metro',
  'Airport',
  'School / University',
  'Event / Venue',
  'Street / Public Area',
  'Other',
];

const whenOptions = ['Today', 'Yesterday', 'Last 3 days', 'Last week', 'Earlier'];

export default function ReportFoundView() {
  const [formData, setFormData] = useState<ItemFormData>({
    image: null,
    imagePreview: undefined,
    where: '',
    specificPlace: '',
    when: '',
    description: '',
  });

  const [matches, setMatches] = useState<Match[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.image || !formData.where || !formData.when) {
      alert('Please fill in all required fields: photo, where, and when.');
      return;
    }

    setIsSubmitting(true);
    setShowMatches(false);

    try {
      const results = await submitFoundItem(formData);
      setMatches(results);
      setShowMatches(true);
    } catch (error) {
      console.error('Error submitting found item:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Report a Found Item</h1>
        <p className="text-lg text-gray-600">
          Upload a photo of the item you found and tell us where and when. We'll check if anyone
          has reported it as lost.
        </p>
        <p className="text-sm text-gray-500 mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
          🔒 <strong>Privacy note:</strong> In the full version, faces and IDs will be
          automatically blurred before processing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Item photo <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
            {formData.imagePreview ? (
              <div className="space-y-4">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, image: null, imagePreview: undefined }))
                  }
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Where */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Where did you find it? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.where}
            onChange={(e) => setFormData((prev) => ({ ...prev, where: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Select a location type</option>
            {whereOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Specific Place */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Specific place (optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Dubai Mall, Level 2"
            value={formData.specificPlace}
            onChange={(e) => setFormData((prev) => ({ ...prev, specificPlace: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* When */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            When did you find it? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.when}
            onChange={(e) => setFormData((prev) => ({ ...prev, when: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Select a time frame</option>
            {whenOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Short description (optional)
          </label>
          <textarea
            placeholder="Black leather wallet with a silver keychain."
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Checking for owners...
            </>
          ) : (
            'Check for owners'
          )}
        </button>
      </form>

      {/* Matches Section */}
      {showMatches && (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Suggested Matches</h2>
          {matches.length > 0 ? (
            <div className="space-y-4">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">
                No matches yet. If someone reports a similar lost item, you'll see it here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
