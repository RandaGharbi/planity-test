import styled, { keyframes } from "styled-components";
// Loader Component
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div<{ colors: string[] }>`
  border: 4px solid ${(props) => props.colors[0] || "#eee"};
  border-top: 4px solid ${(props) => props.colors[1] || "#000"};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: ${spin} 2s linear infinite;
`;


interface LoadingProps {
  colors?: string[];
}

const Loading: React.FC<LoadingProps> = ({ colors = [] }) => {
  return <LoaderContainer colors={colors} />;

  
};

export default Loading;