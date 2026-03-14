import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/formatCurrency';

// Mock Data simulating JSONB rows from NeonDB
const MOCK_SERVICES = [
    {
        id: 1,
        name: { en: 'Corporate Registration', ar: 'تسجيل الشركات' },
        description: { en: 'Full mainland incorporation services.', ar: 'خدمات التأسيس الكاملة للشركات.' },
        price: 3500.00
    },
    {
        id: 2,
        name: { en: 'Golden Visa Assist', ar: 'مساعدة الإقامة الذهبية' },
        description: { en: 'Legal document screening for UAE residency.', ar: 'فحص المستندات القانونية للإقامة في الإمارات.' },
        price: 950.50
    },
    {
        id: 3,
        name: { en: 'Contract Drafting', ar: 'صياغة العقود' },
        description: { en: 'Custom drafted professional legal contracts.', ar: 'عقود قانونية احترافية مصاغة خصيصًا.' },
        price: 1200.00
    }
];

export default function ServiceSelection() {
    const { t, i18n } = useTranslation();

    // Helper to extract JSONB field correctly based on current language
    const getLocalized = (jsonbField) => {
        return jsonbField[i18n.language] || jsonbField['en'];
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-primary">{t('services')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_SERVICES.map((service) => (
                    <div key={service.id} className="border border-gray-200 rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {getLocalized(service.name)}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 h-10">
                                {getLocalized(service.description)}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <span className="text-xl text-primary">
                                {formatCurrency(service.price)}
                            </span>
                            <button className="bg-accent text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-opacity-90 transition-opacity">
                                {t('bookService')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
