import styled, { keyframes } from "styled-components";

// Variables CSS
const primaryColor = "#eef0f2";
const errorColor = "red";
const loadingColor = primaryColor;
const popupBgColor = primaryColor;
const popupTextColor = "#000";
const labelTextColor = "#000";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Upload Container
export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 150px;
    border: 1px solid #cbc6c6;
    text-align: center;
    transition: background-color 0.3s ease;

    img {
      width: 30px;
      position: relative;
      top: 5px;
      padding-right: 10px;
    }
  }

  input[type="file"] {
    display: none;
  }

  label {
    padding: 10px 21px;
    color: ${labelTextColor};
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 16px;
    border: 1px solid black;
  }

  label:hover {
    background-color: #e6e6e2;
  }
`;

export const LoadingMessage = styled.div`
  color: ${loadingColor};
  margin-top: 15px;
  font-weight: bold;
`;

export const ErrorMessage = styled.div`
  color: ${errorColor};
  margin-top: 15px;
  font-weight: bold;
`;

export const PopupContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${popupBgColor};
  color: ${popupTextColor};
  padding: 15px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  animation: ${fadeIn} 0.3s ease;
  z-index: 1000;
`;
