import React from 'react';
import styled from 'styled-components';
import Button from './UI/Button';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  gap: 0.5rem;
`;

const PageButton = styled(Button)`
  min-width: 40px;
  height: 40px;
  padding: 0;
  
  &.active {
    background-color: var(--accent-primary);
    color: white;
    box-shadow: 
      inset 4px 4px 8px rgba(0, 0, 0, 0.2),
      inset -4px -4px 8px rgba(255, 255, 255, 0.05);
  }
`;

const PageInfo = styled.div`
  margin: 0 1rem;
  color: var(--text-secondary);
`;

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }
    
    // Add pages around current page
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
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // If there's only one page, don't show pagination
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <PaginationContainer>
      <PageButton 
        variant="secondary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </PageButton>
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <PageInfo key={`ellipsis-${index}`}>...</PageInfo>
        ) : (
          <PageButton 
            key={page}
            variant="secondary"
            className={currentPage === page ? 'active' : ''}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        )
      ))}
      
      <PageButton 
        variant="secondary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination; 