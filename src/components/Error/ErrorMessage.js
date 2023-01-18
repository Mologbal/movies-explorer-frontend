import test from './ErrorMessage.css';

export const ErrorMessage = ({ children }) => {
  return (
    <span className={test.error}>{ children }</span>  //TODO возможны косметические правки в будущем
  );
};