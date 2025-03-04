import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import Button from './UI/Button';

const NavbarContainer = styled.header`
  background-color: var(--bg-secondary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`;

const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  
  span {
    color: var(--accent-primary);
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--bg-secondary);
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent-primary);
  }
  
  &.active {
    color: var(--accent-primary);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <NavbarContainer>
      <div className="container">
        <NavbarContent>
          <Logo to="/">
            D-Lab-Cross
          </Logo>
          
          <MobileMenuButton onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
          
          <NavLinks isOpen={isMenuOpen}>
            <NavLink to="/">ホーム</NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink to="/events/create">イベント作成</NavLink>
                <ButtonGroup>
                  <Button 
                    variant="text" 
                    onClick={handleLogout}
                  >
                    ログアウト
                  </Button>
                  <Button 
                    variant="secondary"
                  >
                    {currentUser?.username}
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <ButtonGroup>
                <Button 
                  variant="text" 
                  as={Link} 
                  to="/login"
                >
                  ログイン
                </Button>
                <Button 
                  variant="primary" 
                  as={Link} 
                  to="/register"
                >
                  新規登録
                </Button>
              </ButtonGroup>
            )}
          </NavLinks>
        </NavbarContent>
      </div>
    </NavbarContainer>
  );
};

export default Navbar; 