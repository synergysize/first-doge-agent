import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Components
import GrantsTable from './GrantsTable';
import LoadingSpinner from './LoadingSpinner';

// Utils
import { formatCurrency, generateSummaryStats } from '../utils/api';

const PageHeader = styled.div`
  background-color: var(--light-gray);
  padding: 40px 0;
  margin-bottom: 30px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const StatCard = styled(motion.div)`
  background-color: var(--white);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--dark-gray);
`;

const FiltersContainer = styled.div`
  background-color: var(--white);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const FilterGroup = styled.div`
  margin-bottom: 15px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--medium-gray);
  border-radius: 4px;
  background-color: var(--white);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ResetButton = styled(FilterButton)`
  background-color: var(--light-gray);
  border: 1px solid var(--medium-gray);
  color: var(--text-color);
  
  &:hover {
    background-color: var(--medium-gray);
  }
`;

const ApplyButton = styled(FilterButton)`
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  color: var(--white);
  
  &:hover {
    background-color: #1c478a;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 4px;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--white)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text-color)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--medium-gray)'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--light-gray)'};
  }
`;

const GrantsPage = ({ grantsData, isLoading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    agency: '',
    recipient: '',
    minValue: '',
    maxValue: '',
    minSavings: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // Stats from the data
  const stats = !isLoading && !error && grantsData ? generateSummaryStats(grantsData) : null;
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      agency: '',
      recipient: '',
      minValue: '',
      maxValue: '',
      minSavings: '',
      dateFrom: '',
      dateTo: ''
    });
  };
  
  // Apply filters (placeholder for API call)
  const applyFilters = () => {
    // In a real implementation, this would make an API call with the filters
    console.log('Applying filters:', filters);
    setCurrentPage(1); // Reset to first page when applying filters
  };
  
  // Calculate total pages
  const totalPages = grantsData ? Math.ceil(grantsData.meta.total_results / 10) : 0;
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const showMax = 5; // Maximum number of page links to show
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate start and end of page range
    let startPage = Math.max(2, currentPage - Math.floor(showMax / 2));
    let endPage = Math.min(totalPages - 1, startPage + showMax - 3);
    
    // Adjust if we're near the beginning
    if (startPage === 2) {
      endPage = Math.min(totalPages - 1, showMax - 1);
    }
    
    // Adjust if we're near the end
    if (endPage === totalPages - 1) {
      startPage = Math.max(2, totalPages - showMax + 2);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // In a real implementation, this would make an API call to get the next page
  };
  
  // Animation variants for the stats cards
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
  
  return (
    <>
      <PageHeader>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Government Grant Savings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Explore our comprehensive database of government grants and associated savings identified by the First Doge Agent ($FDA).
          </motion.p>
          
          {!isLoading && !error && stats && (
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="stats-container"
            >
              <StatsContainer>
                <StatCard variants={statItemVariants}>
                  <StatValue>{formatCurrency(stats.totalValue)}</StatValue>
                  <StatLabel>Total Grant Value</StatLabel>
                </StatCard>
                
                <StatCard variants={statItemVariants}>
                  <StatValue>{formatCurrency(stats.totalSavings)}</StatValue>
                  <StatLabel>Total Savings</StatLabel>
                </StatCard>
                
                <StatCard variants={statItemVariants}>
                  <StatValue>{stats.savingsPercentage}</StatValue>
                  <StatLabel>Savings Percentage</StatLabel>
                </StatCard>
                
                <StatCard variants={statItemVariants}>
                  <StatValue>{stats.totalGrants}</StatValue>
                  <StatLabel>Grants Monitored</StatLabel>
                </StatCard>
              </StatsContainer>
            </motion.div>
          )}
        </div>
      </PageHeader>
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FiltersContainer>
            <h3>Filter Grants</h3>
            <p>Use the filters below to narrow down the grants database and find specific information.</p>
            
            <FiltersGrid>
              <FilterGroup>
                <FilterLabel htmlFor="agency">Agency</FilterLabel>
                <FilterInput
                  type="text"
                  id="agency"
                  name="agency"
                  value={filters.agency}
                  onChange={handleFilterChange}
                  placeholder="e.g. USAID"
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="recipient">Recipient</FilterLabel>
                <FilterInput
                  type="text"
                  id="recipient"
                  name="recipient"
                  value={filters.recipient}
                  onChange={handleFilterChange}
                  placeholder="e.g. GAVI FOUNDATION"
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="minValue">Minimum Value</FilterLabel>
                <FilterInput
                  type="number"
                  id="minValue"
                  name="minValue"
                  value={filters.minValue}
                  onChange={handleFilterChange}
                  placeholder="Min $"
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="maxValue">Maximum Value</FilterLabel>
                <FilterInput
                  type="number"
                  id="maxValue"
                  name="maxValue"
                  value={filters.maxValue}
                  onChange={handleFilterChange}
                  placeholder="Max $"
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="minSavings">Minimum Savings</FilterLabel>
                <FilterInput
                  type="number"
                  id="minSavings"
                  name="minSavings"
                  value={filters.minSavings}
                  onChange={handleFilterChange}
                  placeholder="Min savings $"
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="dateFrom">Date From</FilterLabel>
                <FilterInput
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="dateTo">Date To</FilterLabel>
                <FilterInput
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                />
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="sortBy">Sort By</FilterLabel>
                <FilterSelect id="sortBy" name="sortBy" onChange={handleFilterChange}>
                  <option value="value">Value (Highest First)</option>
                  <option value="savings">Savings (Highest First)</option>
                  <option value="date">Date (Newest First)</option>
                  <option value="savingsPercentage">Savings % (Highest First)</option>
                </FilterSelect>
              </FilterGroup>
            </FiltersGrid>
            
            <FilterButtons>
              <ResetButton onClick={resetFilters}>Reset Filters</ResetButton>
              <ApplyButton onClick={applyFilters}>Apply Filters</ApplyButton>
            </FilterButtons>
          </FiltersContainer>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2>Grant Savings Database</h2>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <GrantsTable grantsData={grantsData} />
              
              <PaginationContainer>
                <PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </PaginationButton>
                
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} style={{ margin: '0 5px' }}>...</span>
                  ) : (
                    <PaginationButton
                      key={page}
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationButton>
                  )
                ))}
                
                <PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </PaginationButton>
              </PaginationContainer>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default GrantsPage;