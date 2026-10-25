import React from "react"

/**
 * Spooky Halloween Vector Icon Library
 * Replaces cartoon unicode emojis with crisp, theme-aware SVGs
 */

export const PumpkinIcon: React.FC<{ className?: string }> = ({
    className = "w-4 h-4 inline-block",
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {/* Pumpkin body with stem and carved face cutouts */}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 1.5 C11.8 1.5 12 1.8 12.1 2.2 L12.6 4.8 C17.2 5.2 21 9.1 21 13.8 C21 18.6 17 22.5 12 22.5 C7 22.5 3 18.6 3 13.8 C3 9.1 6.8 5.2 11.4 4.8 L11.9 2.2 C12 1.8 12.2 1.5 12.5 1.5 H11.5 Z M8.2 10.2 L10.8 12.2 L8.2 13.8 Z M15.8 10.2 L13.2 12.2 L15.8 13.8 Z M12 13.2 L10.8 14.8 H13.2 Z M7.8 16.5 C9.2 18.5 14.8 18.5 16.2 16.5 C14.6 17.6 13.4 16.2 12 17.2 C10.6 16.2 9.4 17.6 7.8 16.5 Z"
        />
    </svg>
)

export const BatIcon: React.FC<{ className?: string }> = ({
    className = "w-4 h-4 inline-block",
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M12 8.5 C12.8 7 13.8 6 15 6 C17 6 18.5 7.5 20 7 C21.5 6.5 22.5 5 23 4 C23 7 21.5 10 20 11.5 C22 13 23 15 23 17 C20.5 16 18 13.5 16 14 C14 14.5 13 17 12 19 C11 17 10 14.5 8 14 C6 13.5 3.5 16 1 17 C1 15 2 13 4 11.5 C2.5 10 1 7 1 4 C1.5 5 2.5 6.5 4 7 C5.5 7.5 7 6 9 6 C10.2 6 11.2 7 12 8.5 Z" />
    </svg>
)

export const SkullIcon: React.FC<{ className?: string }> = ({
    className = "w-4 h-4 inline-block",
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2 C6.5 2 3 6 3 11 C3 14 4.5 16.5 7 18 L7 21 C7 21.6 7.4 22 8 22 L16 22 C16.6 22 17 21.6 17 21 L17 18 C19.5 16.5 21 14 21 11 C21 6 17.5 2 12 2 Z M8.5 10 C9.6 10 10.5 11 10.5 12.2 C10.5 13.4 9.6 14.2 8.5 14.2 C7.4 14.2 6.5 13.4 6.5 12.2 C6.5 11 7.4 10 8.5 10 Z M15.5 10 C16.6 10 17.5 11 17.5 12.2 C17.5 13.4 16.6 14.2 15.5 14.2 C14.4 14.2 13.5 13.4 13.5 12.2 C13.5 11 14.4 10 15.5 10 Z M12 14.5 L11 16 H13 Z M9 19.5 H10.2 V21 H9 Z M11.4 19.5 H12.6 V21 H11.4 Z M13.8 19.5 H15 V21 H13.8 Z"
        />
    </svg>
)

export const GhostIcon: React.FC<{ className?: string }> = ({
    className = "w-4 h-4 inline-block",
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2 C7 2 4 6 4 11 L4 21 C4 21.6 4.6 22 5.1 21.7 L7.5 20.3 L9.9 21.7 C10.3 22 10.9 21.9 11.2 21.5 L12 20.3 L12.8 21.5 C13.1 21.9 13.7 22 14.1 21.7 L16.5 20.3 L18.9 21.7 C19.4 22 20 21.6 20 21 L20 11 C20 6 17 2 12 2 Z M9 9.5 C9.8 9.5 10.5 10.2 10.5 11 C10.5 11.8 9.8 12.5 9 12.5 C8.2 12.5 7.5 11.8 7.5 11 C7.5 10.2 8.2 9.5 9 9.5 Z M15 9.5 C15.8 9.5 16.5 10.2 16.5 11 C16.5 11.8 15.8 12.5 15 12.5 C14.2 12.5 13.5 11.8 13.5 11 C13.5 10.2 14.2 9.5 15 9.5 Z M12 14 C12.8 14 13.5 14.7 13.5 15.5 C13.5 16.3 12.8 17 12 17 C11.2 17 10.5 16.3 10.5 15.5 C10.5 14.7 11.2 14 12 14 Z"
        />
    </svg>
)

export const CandyIcon: React.FC<{ className?: string }> = ({
    className = "w-4 h-4 inline-block",
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path d="M17.8 6.2 C15.5 3.9 11.8 3.9 9.5 6.2 C7.2 8.5 7.2 12.2 9.5 14.5 C11.8 16.8 15.5 16.8 17.8 14.5 C20.1 12.2 20.1 8.5 17.8 6.2 Z" />
        <path d="M8 8 L3.5 5.5 C2.8 5.1 2 5.7 2.2 6.5 L3.2 10.5 L2.2 14.5 C2 15.3 2.8 15.9 3.5 15.5 L8 13 Z" opacity="0.85" />
        <path d="M16 11 L20.5 8.5 C21.2 8.1 22 8.7 21.8 9.5 L20.8 13.5 L21.8 17.5 C22 18.3 21.2 18.9 20.5 18.5 L16 16 Z" opacity="0.85" />
    </svg>
)

export const ScrollIcon: React.FC<{ className?: string }> = ({
    className = "w-4 h-4 inline-block",
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 17V5a2 2 0 0 0-2-2H4" />
        <path d="M8 21h12a2 2 0 0 0 2-2v-2H10a2 2 0 0 0-2 2Z" />
        <path d="M15 7h4" />
        <path d="M15 11h4" />
    </svg>
)
