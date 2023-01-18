import {useState} from 'react';

//Время взято по личным ощущениям
export const useFormError = () => {  
  const [error, setError] = useState('');

  function showError(message) {
    setError(message);
    setTimeout(function() {
      setError('')
    }, 4000);
  }

  return { error, showError };
}