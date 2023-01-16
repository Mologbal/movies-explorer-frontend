import './Filter.css';
import { useState } from 'react';

export function Filter({
    label,
    type = "checkbox",
    className = "filter__none",
    name,
    checked
}) {
    const [isChecked, setIsChecked] = useState(checked);

    function handleMe() {
        setIsChecked(!isChecked);
    }

    return (
        <label className="filter">
            <input
                type={type}
                className={className}
                name={name}
                checked={isChecked}
                onChange={handleMe}></input>
            <span className={`filter__style ${isChecked && "filter__style_active"}`}></span>
            <span className="filter__label">{label}</span>
        </label>
    );
};
