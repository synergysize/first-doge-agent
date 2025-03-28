import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--white);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  
  span.token {
    color: var(--secondary-color);
    margin-left: 5px;
  }
  
  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--white);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
`;

const NavLink = styled(Link)`
  margin: 0 15px;
  padding: 5px 0;
  color: var(--text-color);
  font-weight: 500;
  position: relative;
  text-decoration: none;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::after, &.active::after {
    transform: scaleX(1);
  }
  
  &.active {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const NavButton = styled(Link)`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  margin-left: 20px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1c478a;
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    margin: 15px 0 0 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-color);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const OfficialBadge = styled.div`
  background-color: var(--light-gray);
  padding: 5px 10px;
  font-size: 0.8rem;
  color: var(--dark-gray);
  text-align: center;
  border-bottom: 1px solid var(--medium-gray);
  
  span {
    font-weight: 700;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <>
      <OfficialBadge>
        <div className="container">
          Official Portal of the <span>First Doge Agent ($FDA)</span> | Empowering Grant Transparency
        </div>
      </OfficialBadge>
      <HeaderContainer>
        <NavContainer>
          <Logo to="/">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              🐕
            </motion.div>
            First Doge Agent <span className="token">$FDA</span>
          </Logo>
          
          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
          
          <NavLinks isOpen={isMenuOpen}>
            <NavLink 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </NavLink>
            <NavLink 
              to="/grants" 
              className={location.pathname === '/grants' ? 'active' : ''}
            >
              Grants
            </NavLink>
            <NavLink 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </NavLink>
            <NavButton to="/grants">View Savings</NavButton>
          </NavLinks>
        </NavContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;