import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 450px;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h2`
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: var(--text-secondary);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 107, 107, 0.1);
  border-left: 3px solid var(--error);
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: var(--error);
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-secondary);
  
  a {
    color: var(--accent-primary);
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'ユーザー名は必須です';
    }
    
    if (!password) {
      newErrors.password = 'パスワードは必須です';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(username, password);
      navigate('/');
    } catch (error) {
      console.error('ログインエラー:', error);
      // Error is handled by the AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <LoginContainer>
      <LoginCard>
        <Card.Body>
          <LoginHeader>
            <LoginTitle>おかえりなさい</LoginTitle>
            <LoginSubtitle>アカウントにサインインしてください</LoginSubtitle>
          </LoginHeader>
          
          {authError && (
            <ErrorMessage>{authError}</ErrorMessage>
          )}
          
          <LoginForm onSubmit={handleSubmit}>
            <Input
              label="ユーザー名"
              type="text"
              placeholder="ユーザー名を入力"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />
            
            <Input
              label="パスワード"
              type="password"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            
            <Button 
              type="submit" 
              fullWidth 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'サインイン中...' : 'サインイン'}
            </Button>
          </LoginForm>
          
          <RegisterLink>
            アカウントをお持ちでない方は <Link to="/register">新規登録</Link>
          </RegisterLink>
        </Card.Body>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 