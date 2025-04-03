import "./errorItem.scss";
import { AiOutlineWarning } from "react-icons/ai";

type ErrorComponentProps = {
  message?: string;
};

export const ErrorItem = (props: ErrorComponentProps) => {
  const { message } = props;
  return (
    <div className="error-component">
      <AiOutlineWarning className="error-icon" />
      <h2>Oops! Something Went Wrong</h2>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};
