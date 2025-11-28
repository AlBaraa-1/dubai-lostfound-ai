import { Search, Upload, Sparkles, Users, Shield, Eye, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomeViewProps {
  onNavigate: (view: 'report-lost' | 'report-found') => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const { t, dir } = useLanguage();

  return (
    <div className="space-y-16" dir={dir}>
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          {t('home_hero_title')}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 px-4">
          {t('home_hero_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onNavigate('report-lost')}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            {t('home_cta_lost')}
          </button>
          <button
            onClick={() => onNavigate('report-found')}
            className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {t('home_cta_found')}
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          {t('home_how_it_works_title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{t('home_step_1_title')}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('home_step_1_heading')}</h3>
            <p className="text-gray-600">{t('home_step_1_desc')}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{t('home_step_2_title')}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('home_step_2_heading')}</h3>
            <p className="text-gray-600">{t('home_step_2_desc')}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{t('home_step_3_title')}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('home_step_3_heading')}</h3>
            <p className="text-gray-600">{t('home_step_3_desc')}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{t('home_step_4_title')}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('home_step_4_heading')}</h3>
            <p className="text-gray-600">{t('home_step_4_desc')}</p>
          </div>
        </div>
      </section>

      {/* Why Dubai Needs This Section */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          {t('home_why_title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('home_why_citywide_title')}</h3>
            <p className="text-gray-700">
              {t('home_why_citywide_desc')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('home_why_ai_title')}</h3>
            <p className="text-gray-700">
              {t('home_why_ai_desc')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('home_why_privacy_title')}</h3>
            <p className="text-gray-700">
              {t('home_why_privacy_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-600">
          {t('home_footer')}
        </p>
      </footer>
    </div>
  );
}
