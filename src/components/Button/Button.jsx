import './Button.css';
import React from 'react';

function Button({
    type = 'button',
    children,
    className = ' ',
    onClick
}) {
    return (
        <button type={type} className={`button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
