import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  min-height: 60vh;
`;

const ErrorCode = styled(motion.div)`
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 20px;
  position: relative;
  display: flex;
  align-items: center;
`;

const Doge = styled(motion.div)`
  font-size: 4rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ErrorTitle = styled(motion.h1)`
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--text-color);
`;

const ErrorDescription = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  color: var(--dark-gray);
  margin-bottom: 30px;
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <ErrorCode
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        4<Doge
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >🐕</Doge>4
      </ErrorCode>
      
      <ErrorTitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Page Not Found
      </ErrorTitle>
      
      <ErrorDescription
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Oops! It seems like the First Doge Agent ($FDA) couldn't locate the page you were looking for. Our transparency efforts don't extend to non-existent pages!
      </ErrorDescription>
      
      <ButtonsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link to="/" className="button button-primary">
          Return to Homepage
        </Link>
        <Link to="/grants" className="button button-secondary">
          Explore Grants
        </Link>
      </ButtonsContainer>
    </NotFoundContainer>
  );
};

export default NotFoundPage;