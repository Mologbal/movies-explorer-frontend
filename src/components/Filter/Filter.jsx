import './Filter.css';
import React from 'react';
import { useState } from 'react';

export function Filter({
    name,
    checked,
    className = "filter__none",
    handler,
    label,
    type = "checkbox",
}) {
    
    return (
        <label className="filter">
            <input
                type={type}
                className={className}
                name={name}
                checked={checked}
                onChange={handler}></input>
            <span className={`filter__style ${checked && "filter__style_active"}`}></span>
            <span className="filter__label">{label}</span>
        </label>
    );
};
