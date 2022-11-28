import './Inputs.css';

export function Inputs({
    type = 'text',
    name,
    placeholder,
    value = '',
    handler,
    max,
    required = true,
    errorText = '',
    min
}) {

    return (
        <label className="input">
            <span className="input__placeholder">{placeholder}</span>
            <input
                type={type}
                name={name}
                onInput={handler}
                value={value}
                minLength={min}
                maxLength={max}
                required={required}
                className={`input__input ${errorText && 'input__input_error'}`}/> {errorText && <span className="input__error">{errorText}</span>}
        </label>
    );
};
