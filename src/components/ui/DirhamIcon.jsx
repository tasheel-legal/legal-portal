import React from 'react';

export default function DirhamIcon({ className = "w-4 h-4 inline-block" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-label="Dirham"
            role="img"
        >
            {/* A custom representation of the Dirham based on Latin D with two horizontal lines */}
            <path d="M7 6v12h4a6 6 0 0 0 0-12H7z" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="3" y1="14" x2="21" y2="14" />
        </svg>
    );
}
