import './ErrorMessage.css';

export const ErrorMessage = ({ children }) => {
  return (
    <span className='errorMessage'>{ children }</span>
  );
};

export const SuccessMessage = ({ children }) => {
  return (
    <span className='successMessage'>{ children }</span>
  );
};