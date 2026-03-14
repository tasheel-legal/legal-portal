import React from 'react';
import DirhamIcon from '../components/ui/DirhamIcon';

export function formatCurrency(amount) {
    const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    return (
        <span className="inline-flex items-center gap-1 font-semibold">
            <DirhamIcon />
            <span dir="ltr">{formatted}</span>
        </span>
    );
}
