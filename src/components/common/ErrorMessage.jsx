const ErrorMessage = ({ message, onRetry }) => {
    return (
      <div className="error-message" role="alert">
        <p className="error-text">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="retry-button"
            type="button"
          >
            다시 시도
          </button>
        )}
      </div>
    );
  };
  
  export default ErrorMessage;