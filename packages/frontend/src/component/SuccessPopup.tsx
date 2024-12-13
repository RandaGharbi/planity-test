import { PopupContainer } from "../styles/FileUploadStyles";

// Success Popup Component
interface SuccessPopupProps {
  message: string;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({ message }) => {
  return <PopupContainer>{message}</PopupContainer>;
};