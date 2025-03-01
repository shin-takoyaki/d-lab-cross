import React from 'react';
import styled, { css } from 'styled-components';

const CardContainer = styled.div`
  background-color: var(--bg-secondary);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${props => props.interactive && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
    }
  `}
  
  ${props => props.variant === 'elevated' && css`
    box-shadow: 
      8px 8px 16px var(--shadow-color-strong),
      -8px -8px 16px var(--shadow-color);
  `}
  
  ${props => props.variant === 'flat' && css`
    box-shadow: 
      4px 4px 8px var(--shadow-color-strong),
      -4px -4px 8px var(--shadow-color);
  `}
  
  ${props => props.variant === 'inset' && css`
    box-shadow: 
      inset 4px 4px 8px var(--shadow-color-strong),
      inset -4px -4px 8px var(--shadow-color);
  `}
`;

const CardHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid var(--bg-tertiary);
`;

const CardBody = styled.div`
  padding: 1.25rem;
`;

const CardFooter = styled.div`
  padding: 1.25rem;
  border-top: 1px solid var(--bg-tertiary);
`;

const Card = ({ 
  children, 
  variant = 'elevated', 
  interactive = false,
  className,
  ...props 
}) => {
  return (
    <CardContainer 
      variant={variant} 
      interactive={interactive}
      className={className}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card; 