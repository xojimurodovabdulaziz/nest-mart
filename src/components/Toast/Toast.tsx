import { CheckCircle2, AlertCircle } from "lucide-react";
import "./Toast.css";

interface Props {
  message: string;
  type: "success" | "error";
}

const Toast = ({ message, type }: Props) => {
  return (
    <div className={`toast toast-${type}`}>
      {type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
