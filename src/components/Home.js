import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Components
import GrantsTable from './GrantsTable';
import LoadingSpinner from './LoadingSpinner';

// Utils
import { formatCurrency, generateSummaryStats } from '../utils/api';

const Home = ({ grantsData, isLoading, error }) => {
  // Animation references
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [tokenRef, tokenInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Stats animation variants
  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };
  
  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  
  // Get summary statistics if data is available
  const stats = !isLoading && !error && grantsData ? generateSummaryStats(grantsData) : null;
  
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>First Doge Agent <span>$FDA</span></h1>
            <p>Transforming government transparency through grant savings monitoring and tokenized accountability</p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link to="/grants" className="button button-secondary">
                Explore Grant Savings
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2>Impact Dashboard</h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <motion.div 
              className="stats-grid"
              ref={statsRef}
              variants={statsVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
            >
              <motion.div className="stat-card" variants={statItemVariants}>
                <div className="stat-value">{formatCurrency(stats?.totalValue)}</div>
                <div className="stat-label">Total Grant Value</div>
              </motion.div>
              
              <motion.div className="stat-card" variants={statItemVariants}>
                <div className="stat-value">{formatCurrency(stats?.totalSavings)}</div>
                <div className="stat-label">Total Savings</div>
              </motion.div>
              
              <motion.div className="stat-card" variants={statItemVariants}>
                <div className="stat-value">{stats?.savingsPercentage}</div>
                <div className="stat-label">Savings Percentage</div>
              </motion.div>
              
              <motion.div className="stat-card" variants={statItemVariants}>
                <div className="stat-value">{stats?.totalGrants}</div>
                <div className="stat-label">Grants Monitored</div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Recent Grants Section */}
      <section className="grants-section">
        <div className="container">
          <h2>Recent Grant Savings</h2>
          <p>Explore the most recent government grants and associated savings identified by the First Doge Agent ($FDA).</p>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <GrantsTable grantsData={grantsData} limit={5} />
              <div className="text-center">
                <Link to="/grants" className="button button-primary">
                  View All Grants
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>How We Drive Transparency</h2>
          
          <motion.div 
            className="features-grid"
            ref={featuresRef}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                }
              }
            }}
          >
            <motion.div 
              className="feature-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Real-time Monitoring</h3>
              <p className="feature-description">
                We track government grants in real-time, ensuring complete transparency 
                and accountability for all public spending.
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Savings Identification</h3>
              <p className="feature-description">
                Our advanced algorithms identify potential savings opportunities
                across government grant programs, maximizing taxpayer value.
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <div className="feature-icon">🔗</div>
              <h3 className="feature-title">Blockchain Verification</h3>
              <p className="feature-description">
                All grant data is verified and secured using blockchain technology,
                ensuring immutable records and enhanced trust.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Token Section */}
      <section className="token-section">
        <div className="container">
          <div className="token-heading">
            <h2>The $FDA Token</h2>
            <p>Empowering citizen oversight through tokenized governance</p>
          </div>
          
          <motion.div 
            className="token-card"
            ref={tokenRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={tokenInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <div className="token-symbol">$FDA</div>
            <p className="token-description">
              The First Doge Agent token ($FDA) represents a revolutionary approach to government 
              transparency and accountability. By holding $FDA tokens, citizens gain governance 
              rights to propose and vote on transparency initiatives.
            </p>
            
            <div className="token-stats">
              <div className="token-stat">
                <div className="token-stat-value">1B</div>
                <div className="token-stat-label">Total Supply</div>
              </div>
              
              <div className="token-stat">
                <div className="token-stat-value">60%</div>
                <div className="token-stat-label">Public Distribution</div>
              </div>
              
              <div className="token-stat">
                <div className="token-stat-value">30%</div>
                <div className="token-stat-label">Transparency Reserve</div>
              </div>
              
              <div className="token-stat">
                <div className="token-stat-value">10%</div>
                <div className="token-stat-label">Governance Fund</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Join the Transparency Revolution</h2>
            <p>
              Become part of the movement to enhance government transparency and 
              accountability. Explore our grant database and learn how the $FDA 
              token is transforming public oversight.
            </p>
            <div className="cta-buttons">
              <Link to="/grants" className="button button-primary">
                Explore Grants
              </Link>
              <Link to="/about" className="button button-secondary">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;