import { useState, useCallback } from 'react';

export function useFormAndValidation() {
  const [ isValid, setIsValid ] = useState(true);
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});

  const resetForm = useCallback((Valid = false, Values = {}, Errors = {}) => {
    setIsValid(Valid);
    setValues(Values);
    setErrors(Errors);
  }, [setIsValid, setValues, setErrors]);

  function handleChange(event) {
    const {name, value} = event.target
    setIsValid(event.target.closest('form').checkValidity());
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: event.target.validationMessage});
  };

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}
