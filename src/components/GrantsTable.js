import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Utils
import { formatCurrency, formatDate, calculateSavingsPercentage } from '../utils/api';

const TableContainer = styled.div`
  margin-bottom: 30px;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.thead`
  background-color: var(--primary-color);
  color: var(--white);
`;

const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 500;
`;

const TableRow = styled(motion.tr)`
  background-color: var(--white);
  
  &:nth-child(even) {
    background-color: var(--light-gray);
  }
  
  &:hover {
    background-color: rgba(26, 95, 180, 0.05);
  }
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid var(--medium-gray);
`;

const SavingsCell = styled(TableCell)`
  color: var(--success);
  font-weight: 500;
`;

const NoDataMessage = styled.div`
  padding: 30px;
  text-align: center;
  background-color: var(--light-gray);
  border-radius: 8px;
  color: var(--dark-gray);
`;

const ViewLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  &::after {
    content: '→';
    margin-left: 5px;
  }
`;

const SavingsBadge = styled.span`
  background-color: #e8f5e9;
  color: var(--success);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-block;
`;

const GrantsTable = ({ grantsData, limit }) => {
  // If no data is available yet
  if (!grantsData || !grantsData.grants || grantsData.grants.length === 0) {
    return (
      <NoDataMessage>
        No grants data available at this time.
      </NoDataMessage>
    );
  }
  
  // Limit the number of grants displayed if specified
  const displayedGrants = limit ? grantsData.grants.slice(0, limit) : grantsData.grants;
  
  // Animation variants for table rows
  const tableRowVariants = {
    hidden: { opacity: 0 },
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };
  
  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Agency</TableHeaderCell>
            <TableHeaderCell>Recipient</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
            <TableHeaderCell>Savings</TableHeaderCell>
            <TableHeaderCell>% Saved</TableHeaderCell>
            <TableHeaderCell>Details</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {displayedGrants.map((grant, index) => (
            <TableRow
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={tableRowVariants}
            >
              <TableCell>{formatDate(grant.date)}</TableCell>
              <TableCell>{grant.agency || 'N/A'}</TableCell>
              <TableCell>{grant.recipient || 'N/A'}</TableCell>
              <TableCell>{formatCurrency(grant.value)}</TableCell>
              <SavingsCell>
                {grant.savings > 0 ? (
                  <SavingsBadge>{formatCurrency(grant.savings)}</SavingsBadge>
                ) : (
                  formatCurrency(grant.savings)
                )}
              </SavingsCell>
              <TableCell>{calculateSavingsPercentage(grant.savings, grant.value)}</TableCell>
              <TableCell>
                {grant.link ? (
                  <ViewLink href={grant.link} target="_blank" rel="noopener noreferrer">
                    View Details
                  </ViewLink>
                ) : (
                  'N/A'
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default GrantsTable;