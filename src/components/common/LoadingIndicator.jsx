const LoadingIndicator = ({ text, size = 'md' }) => {
    const sizeClass = {
      sm: 'loading-indicator-sm',
      md: 'loading-indicator-md',
      lg: 'loading-indicator-lg'
    }[size] || 'loading-indicator-md';
  
    return (
      <div className={`loading-indicator ${sizeClass}`} role="status">
        <p>
          <span className="loading-spinner" aria-hidden="true"></span>
          {text && <span className="loading-text">{text}</span>}
        </p>
      </div>
    );
  };
  
  export default LoadingIndicator;