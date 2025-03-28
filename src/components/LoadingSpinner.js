import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--light-gray);
  border-top: 5px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  margin-top: 20px;
  color: var(--dark-gray);
  font-size: 1rem;
  text-align: center;
`;

const LoadingSpinner = ({ message = 'Loading data...' }) => {
  return (
    <SpinnerContainer>
      <div>
        <Spinner />
        <LoadingText>{message}</LoadingText>
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;