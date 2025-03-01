import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--bg-secondary);
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FooterTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FooterLink = styled(Link)`
  display: block;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent-primary);
  }
`;

const FooterText = styled.p`
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;

const Copyright = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--bg-tertiary);
  text-align: center;
  color: var(--text-secondary);
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <FooterTitle>イベントマッチ</FooterTitle>
            <FooterText>
              あなたの興味に合ったイベントを見つけて作成しましょう。
              同じ志を持つ人々とつながり、ネットワークを広げましょう。
            </FooterText>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>クイックリンク</FooterTitle>
            <FooterLink to="/">ホーム</FooterLink>
            <FooterLink to="/events/create">イベント作成</FooterLink>
            <FooterLink to="/login">ログイン</FooterLink>
            <FooterLink to="/register">新規登録</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <FooterTitle>お問い合わせ</FooterTitle>
            <FooterText>メール: info@eventmatch.com</FooterText>
            <FooterText>電話: 03-1234-5678</FooterText>
            <FooterText>住所: 〒100-0001 東京都千代田区1-1-1</FooterText>
          </FooterSection>
        </FooterContent>
        
        <Copyright>
          &copy; {currentYear} イベントマッチ. All rights reserved.
        </Copyright>
      </div>
    </FooterContainer>
  );
};

export default Footer; 