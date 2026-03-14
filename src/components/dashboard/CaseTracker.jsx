import React from 'react';
import { useTranslation } from 'react-i18next';

// Mock Data
const MOCK_CASES = [
    { id: 101, title: 'Corporate Registration', status: 'inProgress', date: '2026-03-01' },
    { id: 102, title: 'Visa Processing', status: 'pending', date: '2026-03-10' },
    { id: 103, title: 'Legal Consultation', status: 'completed', date: '2026-02-15' },
];

export default function CaseTracker() {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-primary">{t('cases')}</h2>

            <div className="space-y-4 relative before:absolute before:inset-0 before:ms-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                {MOCK_CASES.map((item, index) => (
                    <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Timeline Icon */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-secondary text-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ms-auto md:ms-0">
                            <span className="text-xs font-bold">{index + 1}</span>
                        </div>

                        {/* Case Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-gray-200 bg-gray-50 hover:bg-white transition-colors duration-200">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-gray-900">{item.title}</span>
                                <span className={`text-xs px-2 py-1 rounded font-medium ${item.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        item.status === 'inProgress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {t(item.status)}
                                </span>
                            </div>
                            <time className="block text-sm text-gray-500 font-mono">{item.date}</time>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
