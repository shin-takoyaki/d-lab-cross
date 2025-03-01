import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from './UI/Button';

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  background-color: var(--bg-secondary);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 
    8px 8px 16px var(--shadow-color-strong),
    -8px -8px 16px var(--shadow-color);
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const SearchGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SearchLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background-color: var(--bg-tertiary);
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
`;

const SearchSelect = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background-color: var(--bg-tertiary);
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
  
  option {
    background-color: var(--bg-secondary);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchBar = ({ onSearch, categories = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ q: searchQuery, category: selectedCategory });
  };
  
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    onSearch({ q: '', category: '' });
  };
  
  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchGroup>
          <SearchLabel>キーワード検索</SearchLabel>
          <SearchInput 
            type="text" 
            placeholder="イベント名、説明、場所で検索..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchGroup>
        
        <SearchGroup>
          <SearchLabel>カテゴリー</SearchLabel>
          <SearchSelect 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">すべてのカテゴリー</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </SearchSelect>
        </SearchGroup>
        
        <ButtonGroup>
          <Button type="submit" variant="primary">
            検索
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={handleReset}
          >
            リセット
          </Button>
        </ButtonGroup>
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar; 