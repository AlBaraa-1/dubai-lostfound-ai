import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { ItemFormData } from '../types';
import { submitFoundItem, buildImageUrl, MatchResult } from '../api/lostFoundApi';
import MatchCard from '../components/MatchCard';
import { useLanguage } from '../context/LanguageContext';

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
  const { t, dir } = useLanguage();
  const [formData, setFormData] = useState<ItemFormData>({
    image: null,
    imagePreview: undefined,
    where: '',
    specificPlace: '',
    when: '',
    description: '',
  });

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    try {
      const payload = {
        file: formData.image!,
        title: formData.description || `Found item at ${formData.where}`,
        description: formData.description || undefined,
        locationType: formData.where,
        locationDetail: formData.specificPlace || undefined,
        timeFrame: formData.when,
      };

      const response = await submitFoundItem(payload);
      setMatches(response.matches);
      setShowMatches(true);

      // Reset form after successful submission
      setFormData({
        image: null,
        imagePreview: undefined,
        where: '',
        specificPlace: '',
        when: '',
        description: '',
      });
    } catch (error) {
      console.error('Error submitting found item:', error);
      setError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto" dir={dir}>
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t('found_page_title')}</h1>
        <p className="text-lg text-gray-600">
          {t('found_page_subtitle')}
        </p>
        <p className="text-sm text-gray-500 mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
          🔒 <strong>{t('privacy_note')}</strong> {t('privacy_banner')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('lost_form_item_photo')} <span className="text-red-500">*</span>
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
                  {t('lost_remove_image')}
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">{t('lost_upload_click')}</p>
                <p className="text-sm text-gray-500">{t('lost_upload_formats')}</p>
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

        {/* Where and When - Side by Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Where */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('found_form_where_question')} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.where}
              onChange={(e) => setFormData((prev) => ({ ...prev, where: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">{t('lost_form_location_type_placeholder')}</option>
              {whereOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* When */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('found_form_when_question')} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.when}
              onChange={(e) => setFormData((prev) => ({ ...prev, when: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">{t('lost_form_time_frame_placeholder')}</option>
              {whenOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Specific Place */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('lost_form_specific_place')}
          </label>
          <input
            type="text"
            placeholder={t('lost_form_specific_place_placeholder')}
            value={formData.specificPlace}
            onChange={(e) => setFormData((prev) => ({ ...prev, specificPlace: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('lost_form_notes_label')}
          </label>
          <textarea
            placeholder={t('lost_form_notes_placeholder')}
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
              {t('found_form_submitting')}
            </>
          ) : (
            t('found_form_submit')
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </form>

      {/* Matches Section */}
      {showMatches && (() => {
        const filteredMatches = matches.filter(m => m.similarity >= 0.5);
        return (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('found_ai_matches_title')}</h2>
          
          {/* Match Count Message */}
          {filteredMatches.length > 0 ? (
            <p className="text-gray-600 mb-6">
              {t('found_matches_found').replace('{count}', filteredMatches.length.toString())}
            </p>
          ) : (
            <p className="text-gray-600 mb-6">
              {t('found_ai_matches_empty')}
            </p>
          )}
          
          {filteredMatches.length > 0 ? (
            <div className="space-y-4">
              {matches
                .filter(matchResult => matchResult.similarity >= 0.5)
                .map((matchResult) => {
                  // Convert MatchResult to Match format for MatchCard
                  const match = {
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
                  };
                  
                  return <MatchCard key={match.id} match={match} />;
                })}
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
        );
      })()}
    </div>
  );
}
