import "./SuccessAnimation.css";

const SuccessAnimation = ({ message }: { message: string }) => {
  return (
    <div className="success-overlay">
      <div className="success-circle">
        <svg viewBox="0 0 52 52" className="success-check">
          <circle cx="26" cy="26" r="25" className="success-circle-ring" />
          <path className="success-check-mark" d="M14 27l7 7 17-17" />
        </svg>
      </div>
      <p className="success-message">{message}</p>
    </div>
  );
};

export default SuccessAnimation;
