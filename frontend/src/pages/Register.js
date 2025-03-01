import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const RegisterCard = styled(Card)`
  width: 100%;
  max-width: 450px;
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const RegisterTitle = styled.h2`
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const RegisterSubtitle = styled.p`
  color: var(--text-secondary);
`;

const RegisterForm = styled.form`
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

const LoginLink = styled.div`
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

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'ユーザー名は必須です';
    } else if (username.length < 3) {
      newErrors.username = 'ユーザー名は3文字以上必要です';
    }
    
    if (!email.trim()) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'メールアドレスの形式が正しくありません';
    }
    
    if (!password) {
      newErrors.password = 'パスワードは必須です';
    } else if (password.length < 6) {
      newErrors.password = 'パスワードは6文字以上必要です';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません';
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
      await register(username, email, password);
      navigate('/');
    } catch (error) {
      console.error('登録エラー:', error);
      // Error is handled by the AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <RegisterContainer>
      <RegisterCard>
        <Card.Body>
          <RegisterHeader>
            <RegisterTitle>アカウント作成</RegisterTitle>
            <RegisterSubtitle>イベントマッチングコミュニティに参加しましょう</RegisterSubtitle>
          </RegisterHeader>
          
          {authError && (
            <ErrorMessage>{authError}</ErrorMessage>
          )}
          
          <RegisterForm onSubmit={handleSubmit}>
            <Input
              label="ユーザー名"
              type="text"
              placeholder="ユーザー名を選択"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />
            
            <Input
              label="メールアドレス"
              type="email"
              placeholder="メールアドレスを入力"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            
            <Input
              label="パスワード"
              type="password"
              placeholder="パスワードを作成"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            
            <Input
              label="パスワード確認"
              type="password"
              placeholder="パスワードを再入力"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />
            
            <Button 
              type="submit" 
              fullWidth 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'アカウント作成中...' : 'アカウント作成'}
            </Button>
          </RegisterForm>
          
          <LoginLink>
            すでにアカウントをお持ちの方は <Link to="/login">ログイン</Link>
          </LoginLink>
        </Card.Body>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register; 