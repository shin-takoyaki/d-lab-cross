import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;

const NotFoundCard = styled(Card)`
  max-width: 600px;
  text-align: center;
  padding: 2rem;
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  color: var(--accent-primary);
  margin-bottom: 1rem;
  line-height: 1;
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
`;

const NotFoundText = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundCard>
        <Card.Body>
          <NotFoundTitle>404</NotFoundTitle>
          <NotFoundSubtitle>ページが見つかりません</NotFoundSubtitle>
          <NotFoundText>
            お探しのページは削除されたか、名前が変更されたか、
            一時的に利用できない可能性があります。
          </NotFoundText>
          <ButtonContainer>
            <Button 
              variant="secondary" 
              as={Link} 
              to="/"
            >
              ホームに戻る
            </Button>
          </ButtonContainer>
        </Card.Body>
      </NotFoundCard>
    </NotFoundContainer>
  );
};

export default NotFound; 