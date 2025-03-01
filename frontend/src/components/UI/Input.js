import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: none;
  outline: none;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 
    inset 4px 4px 8px var(--shadow-color-strong),
    inset -4px -4px 8px var(--shadow-color);
  
  &:focus {
    box-shadow: 
      inset 6px 6px 10px var(--shadow-color-strong),
      inset -6px -6px 10px var(--shadow-color);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: none;
  outline: none;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 120px;
  resize: vertical;
  box-shadow: 
    inset 4px 4px 8px var(--shadow-color-strong),
    inset -4px -4px 8px var(--shadow-color);
  
  &:focus {
    box-shadow: 
      inset 6px 6px 10px var(--shadow-color-strong),
      inset -6px -6px 10px var(--shadow-color);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const Input = ({ 
  label, 
  type = 'text', 
  error, 
  ...props 
}) => {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      
      {type === 'textarea' ? (
        <TextArea {...props} />
      ) : (
        <StyledInput type={type} {...props} />
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input; 