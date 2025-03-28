import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageHeader = styled.div`
  background-color: var(--light-gray);
  padding: 40px 0;
  margin-bottom: 30px;
`;

const Section = styled.section`
  margin-bottom: 60px;
`;

const SectionHeader = styled.h2`
  position: relative;
  margin-bottom: 30px;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 3px;
    background-color: var(--primary-color);
  }
`;

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const MissionCard = styled(motion.div)`
  background-color: var(--white);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const MissionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const TeamMember = styled(motion.div)`
  text-align: center;
`;

const TeamMemberImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--medium-gray);
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const TeamMemberName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const TeamMemberRole = styled.div`
  color: var(--dark-gray);
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const TokenSection = styled.div`
  background: linear-gradient(135deg, var(--primary-color) 0%, #3584e4 100%);
  color: var(--white);
  padding: 40px;
  border-radius: 8px;
  margin-top: 40px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url('/token-pattern.png') repeat;
    opacity: 0.1;
  }
`;

const TokenContent = styled.div`
  position: relative;
  z-index: 1;
`;

const TokenSymbol = styled.span`
  font-weight: 700;
  color: var(--secondary-color);
`;

const Roadmap = styled.div`
  margin-top: 40px;
`;

const RoadmapItem = styled(motion.div)`
  display: flex;
  margin-bottom: 30px;
  position: relative;
`;

const RoadmapMarker = styled.div`
  min-width: 80px;
  height: 30px;
  background-color: var(--primary-color);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  font-weight: 500;
  margin-right: 20px;
`;

const RoadmapContent = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex: 1;
`;

const AboutPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  
  return (
    <>
      <PageHeader>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About First Doge Agent (<TokenSymbol>$FDA</TokenSymbol>)
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Revolutionizing government transparency through innovative technology and tokenization
          </motion.p>
        </div>
      </PageHeader>
      
      <div className="container">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader>Our Mission</SectionHeader>
            <p>
              The First Doge Agent ($FDA) was established with a clear mission: to enhance government transparency 
              and accountability by leveraging cutting-edge technology. We believe that by providing citizens with 
              access to comprehensive data on government grants and identified savings, we can foster a more 
              transparent and efficient public sector.
            </p>
            
            <MissionGrid>
              <MissionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <MissionIcon>🔍</MissionIcon>
                <h3>Transparency</h3>
                <p>
                  We are committed to making government spending transparent and accessible to all citizens, 
                  enabling better public oversight and accountability.
                </p>
              </MissionCard>
              
              <MissionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <MissionIcon>💰</MissionIcon>
                <h3>Efficiency</h3>
                <p>
                  By identifying and highlighting potential savings in government grants, we help 
                  ensure taxpayer dollars are used efficiently and effectively.
                </p>
              </MissionCard>
              
              <MissionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <MissionIcon>🔗</MissionIcon>
                <h3>Innovation</h3>
                <p>
                  We leverage blockchain technology and tokenization to create innovative solutions 
                  for government transparency and citizen participation.
                </p>
              </MissionCard>
            </MissionGrid>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <SectionHeader>Our Team</SectionHeader>
            <p>
              The First Doge Agent is led by a team of experts in government policy, technology, 
              and finance who are passionate about enhancing public sector transparency.
            </p>
            
            <TeamGrid>
              <TeamMember
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <TeamMemberImage>👩‍💼</TeamMemberImage>
                <TeamMemberName>Dr. Sarah Johnson</TeamMemberName>
                <TeamMemberRole>Director of Transparency</TeamMemberRole>
                <p>Former advisor to the Treasury Department with expertise in public finance</p>
              </TeamMember>
              
              <TeamMember
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <TeamMemberImage>👨‍💻</TeamMemberImage>
                <TeamMemberName>Michael Chen</TeamMemberName>
                <TeamMemberRole>Chief Technology Officer</TeamMemberRole>
                <p>Blockchain specialist with 15+ years experience in government IT systems</p>
              </TeamMember>
              
              <TeamMember
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <TeamMemberImage>👨‍🔬</TeamMemberImage>
                <TeamMemberName>Dr. Robert Wilson</TeamMemberName>
                <TeamMemberRole>Data Science Lead</TeamMemberRole>
                <p>Former lead data scientist at the Congressional Budget Office</p>
              </TeamMember>
              
              <TeamMember
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <TeamMemberImage>👩‍⚖️</TeamMemberImage>
                <TeamMemberName>Amanda Rodriguez</TeamMemberName>
                <TeamMemberRole>Policy Director</TeamMemberRole>
                <p>15+ years experience in government oversight and policy development</p>
              </TeamMember>
            </TeamGrid>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <SectionHeader>The $FDA Token</SectionHeader>
            <p>
              The First Doge Agent token ($FDA) represents a groundbreaking approach to government 
              transparency and accountability. By tokenizing oversight functions, we've created a 
              decentralized system that enables direct citizen participation.
            </p>
            
            <TokenSection>
              <TokenContent>
                <h3>What Makes <TokenSymbol>$FDA</TokenSymbol> Special</h3>
                <p>
                  The $FDA token serves as both a governance mechanism and an incentive for 
                  participation in our transparency ecosystem. Token holders can:
                </p>
                <ul>
                  <li>Vote on which government programs should receive enhanced scrutiny</li>
                  <li>Propose new transparency initiatives and solutions</li>
                  <li>Receive rewards for identifying potential government savings</li>
                  <li>Access premium data and analytics on government spending</li>
                </ul>
                <p>
                  With a total supply of 1 billion tokens, $FDA is designed to maintain long-term 
                  value while incentivizing participation in government transparency efforts.
                </p>
                <Link to="/token" className="button button-secondary">
                  Learn More About $FDA
                </Link>
              </TokenContent>
            </TokenSection>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <SectionHeader>Roadmap</SectionHeader>
            <p>
              Our commitment to enhancing government transparency is reflected in our ambitious roadmap. 
              Here's what we've accomplished and what's coming next:
            </p>
            
            <Roadmap>
              <RoadmapItem
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <RoadmapMarker>Q1 2025</RoadmapMarker>
                <RoadmapContent>
                  <h3>Platform Launch</h3>
                  <p>
                    Initial launch of the First Doge Agent platform with comprehensive 
                    grant database and savings identification.
                  </p>
                  <ul>
                    <li>✅ DOGE API integration</li>
                    <li>✅ Savings calculation algorithm deployment</li>
                    <li>✅ Web platform release</li>
                  </ul>
                </RoadmapContent>
              </RoadmapItem>
              
              <RoadmapItem
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <RoadmapMarker>Q2 2025</RoadmapMarker>
                <RoadmapContent>
                  <h3>$FDA Token Launch</h3>
                  <p>
                    Introduction of the $FDA governance token and initial distribution to 
                    early participants and transparency advocates.
                  </p>
                  <ul>
                    <li>🔜 Token smart contract deployment</li>
                    <li>🔜 Governance framework implementation</li>
                    <li>🔜 Initial token distribution event</li>
                  </ul>
                </RoadmapContent>
              </RoadmapItem>
              
              <RoadmapItem
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <RoadmapMarker>Q3 2025</RoadmapMarker>
                <RoadmapContent>
                  <h3>Advanced Analytics</h3>
                  <p>
                    Deployment of advanced data analytics and machine learning capabilities 
                    to enhance savings identification and forecasting.
                  </p>
                  <ul>
                    <li>🔜 Predictive analytics implementation</li>
                    <li>🔜 Pattern recognition for fraud detection</li>
                    <li>🔜 Interactive data visualization tools</li>
                  </ul>
                </RoadmapContent>
              </RoadmapItem>
              
              <RoadmapItem
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <RoadmapMarker>Q4 2025</RoadmapMarker>
                <RoadmapContent>
                  <h3>Global Expansion</h3>
                  <p>
                    Extending the First Doge Agent platform to international government 
                    spending and multinational grant programs.
                  </p>
                  <ul>
                    <li>🔜 International API integrations</li>
                    <li>🔜 Multi-currency support</li>
                    <li>🔜 Cross-border grant tracking</li>
                  </ul>
                </RoadmapContent>
              </RoadmapItem>
            </Roadmap>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <SectionHeader>Get Involved</SectionHeader>
            <p>
              We believe that government transparency is a collaborative effort. There are many ways to 
              get involved with the First Doge Agent initiative:
            </p>
            
            <div className="card">
              <h3>Join Our Community</h3>
              <p>
                Connect with like-minded individuals passionate about government transparency and 
                efficiency. Share ideas, provide feedback, and help shape the future of the platform.
              </p>
              <div className="button-group">
                <a href="#" className="button button-primary">Join Discord</a>
                <a href="#" className="button button-secondary">Follow on Twitter</a>
              </div>
            </div>
          </motion.div>
        </Section>
      </div>
    </>
  );
};

export default AboutPage;