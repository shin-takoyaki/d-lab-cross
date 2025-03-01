import React from 'react';
import styled, { css } from 'styled-components';

const ButtonBase = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background: var(--accent-primary);
  color: white;
  box-shadow: 
    6px 6px 12px var(--shadow-color-strong),
    -6px -6px 12px var(--shadow-color);
  
  &:hover:not(:disabled) {
    background: var(--accent-secondary);
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 
      inset 4px 4px 8px rgba(0, 0, 0, 0.2),
      inset -4px -4px 8px rgba(255, 255, 255, 0.05);
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: var(--bg-secondary);
  color: var(--text-primary);
  box-shadow: 
    6px 6px 12px var(--shadow-color-strong),
    -6px -6px 12px var(--shadow-color);
  
  &:hover:not(:disabled) {
    background: var(--bg-tertiary);
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 
      inset 4px 4px 8px rgba(0, 0, 0, 0.2),
      inset -4px -4px 8px rgba(255, 255, 255, 0.05);
  }
`;

const TextButton = styled(ButtonBase)`
  background: transparent;
  color: var(--accent-primary);
  padding: 0.5rem 1rem;
  
  &:hover:not(:disabled) {
    color: var(--accent-secondary);
    background: rgba(108, 92, 231, 0.1);
  }
`;

const Button = ({ children, variant = 'primary', ...props }) => {
  switch (variant) {
    case 'secondary':
      return <SecondaryButton {...props}>{children}</SecondaryButton>;
    case 'text':
      return <TextButton {...props}>{children}</TextButton>;
    case 'primary':
    default:
      return <PrimaryButton {...props}>{children}</PrimaryButton>;
  }
};

export default Button; 