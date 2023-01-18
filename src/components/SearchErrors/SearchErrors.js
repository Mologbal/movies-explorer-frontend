import styles from './SearchErrors.css';

export const SearchErrors = ({ children }) => {
  return (
    <div className={styles.error}>{ children }</div>
  );
};