import './Button.css';
import React from 'react';

export function Button({
    type = 'button',
    disabled,
    children,
    className = ' ',
    onClick
}) {
    return (
        <button type={type} className={`button ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

