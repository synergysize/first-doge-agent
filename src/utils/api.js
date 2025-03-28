import axios from 'axios';

// Base URL for the DOGE API
const API_BASE_URL = 'https://api.doge.gov';

/**
 * Fetch grants data from the DOGE API
 * @param {Object} params - Query parameters for the API request
 * @returns {Promise<Array>} - Array of grants data
 */
export const fetchGrantsData = async (params = {}) => {
  const defaultParams = {
    sort_by: 'value',
    sort_order: 'desc',
    page: 1,
    per_page: 10,
    ...params
  };

  try {
    const response = await axios.get(`${API_BASE_URL}/savings/grants`, { params: defaultParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching grants data:', error);
    throw error;
  }
};

/**
 * Format currency values for display
 * @param {number} value - The currency value to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format date strings
 * @param {string} dateString - Date string in format 'M/D/YYYY'
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Return original if parsing fails
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Calculate percentage of savings
 * @param {number} savings - Savings amount
 * @param {number} value - Total value
 * @returns {string} - Formatted percentage string
 */
export const calculateSavingsPercentage = (savings, value) => {
  if (!savings || !value || value === 0) return '0%';
  
  const percentage = (savings / value) * 100;
  return `${percentage.toFixed(1)}%`;
};

/**
 * Generate summary statistics from grants data
 * @param {Array} grantsData - Array of grants objects
 * @returns {Object} - Object containing summary statistics
 */
export const generateSummaryStats = (grantsData) => {
  if (!grantsData || !grantsData.grants || grantsData.grants.length === 0) {
    return {
      totalGrants: 0,
      totalValue: 0,
      totalSavings: 0,
      averageSavings: 0,
      savingsPercentage: '0%'
    };
  }

  const { grants } = grantsData;
  
  const totalGrants = grants.length;
  const totalValue = grants.reduce((sum, grant) => sum + (grant.value || 0), 0);
  const totalSavings = grants.reduce((sum, grant) => sum + (grant.savings || 0), 0);
  const averageSavings = totalGrants ? totalSavings / totalGrants : 0;
  const savingsPercentage = totalValue ? (totalSavings / totalValue) * 100 : 0;

  return {
    totalGrants,
    totalValue,
    totalSavings,
    averageSavings,
    savingsPercentage: `${savingsPercentage.toFixed(1)}%`
  };
};