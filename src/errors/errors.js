import {useState} from 'react';

export const useErrorProfileMessage = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function errorMessage(text) {
        setError(text);
        setTimeout(function () {
            setError('')
        }, 10000);
    }
    function successMessage(text) {
        setSuccess(text);
        setTimeout(function () {
            setSuccess('')
        }, 10000);
    }
    return {error, errorMessage, success, successMessage};
}

export const useSearchError = () => {
    const [error, setError] = useState('');

    function errorMessage(text) {
        setError(text);
        setTimeout(function () {
            setError('')
        }, 50000);
    }
    return {error, errorMessage};
}