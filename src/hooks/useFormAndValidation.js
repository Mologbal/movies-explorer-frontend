import { useState, useCallback } from 'react';

export const useFormAndValidation = () => {
  const [ isValid, setIsValid ] = useState(false);
  const [ errors, setErrors ] = useState({});
  const [ values, setValues ] = useState({});

  const resetForm = useCallback((Values = {}, Valid = false,  Errors = {}) => {
    setValues(Values);
    setIsValid(Valid);
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
