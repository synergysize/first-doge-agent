import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 50px 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: var(--white);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 40px;
      height: 3px;
      background-color: var(--secondary-color);
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--white);
    text-decoration: none;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const TokenSymbol = styled.span`
  font-weight: 700;
  color: var(--secondary-color);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--white);
    font-size: 1.2rem;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <h3>First Doge Agent</h3>
            <p>
              The official portal for government grant savings and transparency. 
              Powered by the <TokenSymbol>$FDA</TokenSymbol> token.
            </p>
            <SocialLinks>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="GitHub">📂</a>
              <a href="#" aria-label="Discord">💬</a>
              <a href="#" aria-label="Telegram">📱</a>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><FooterLink to="/">Home</FooterLink></li>
              <li><FooterLink to="/grants">Grants</FooterLink></li>
              <li><FooterLink to="/about">About</FooterLink></li>
              <li><FooterLink to="/faq">FAQ</FooterLink></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Resources</h3>
            <ul>
              <li><FooterLink to="/whitepaper">Whitepaper</FooterLink></li>
              <li><FooterLink to="/documentation">Documentation</FooterLink></li>
              <li><FooterLink to="/api">API</FooterLink></li>
              <li><FooterLink to="/token">$FDA Token</FooterLink></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Contact</h3>
            <ul>
              <li>Email: info@fda.gov</li>
              <li>Phone: (202) 555-DOGE</li>
              <li>Address: 1600 Pennsylvania Ave NW, Washington, DC 20500</li>
            </ul>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <p>
            &copy; {currentYear} First Doge Agent (<TokenSymbol>$FDA</TokenSymbol>). All rights reserved.
          </p>
          <p>
            <small>This is an official government agency portal for transparency. <TokenSymbol>$FDA</TokenSymbol> tokenization is used for governance and accountability.</small>
          </p>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;