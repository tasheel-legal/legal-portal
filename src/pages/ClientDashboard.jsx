import React from 'react';
import { useTranslation } from 'react-i18next';
import CaseTracker from '../components/dashboard/CaseTracker';
import ServiceSelection from '../components/dashboard/ServiceSelection';

export default function ClientDashboard() {
    const { t } = useTranslation();

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-secondary">{t('dashboard')}</h1>
                <p className="text-gray-500 mt-2">Manage your legal requests securely.</p>
            </header>

            {/* Main Dashboard Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column (or Right in RTL) */}
                <div className="w-full lg:w-1/3">
                    <CaseTracker />
                </div>

                {/* Right Column (or Left in RTL) */}
                <div className="w-full lg:w-2/3">
                    <ServiceSelection />
                </div>
            </div>
        </div>
    );
}
