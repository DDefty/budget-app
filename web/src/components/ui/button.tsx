import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const baseClasses =
    'px-4 py-2 rounded focus:outline-none transition-colors disabled:opacity-50';



export const Button: React.FC<ButtonProps> = ({
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`${baseClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};