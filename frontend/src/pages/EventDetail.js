import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const EventDetailContainer = styled.div`
  padding: 2rem 0;
`;

const EventCard = styled(Card)`
  max-width: 900px;
  margin: 0 auto;
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const EventTitle = styled.h1`
  font-size: 2.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const EventCategory = styled.span`
  display: inline-block;
  background-color: var(--accent-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const EventActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const EventInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
`;

const EventDescription = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre-line;
`;

const EventCreator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--bg-tertiary);
`;

const LoadingContainer = styled(Card)`
  padding: 2rem;
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
`;

const ErrorContainer = styled(Card)`
  padding: 2rem;
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
  color: var(--error);
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  
  &:hover {
    color: var(--accent-primary);
  }
`;

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/api/events/${id}`);
        setEvent(response.data.event);
      } catch (err) {
        setError('イベント詳細の取得に失敗しました。後でもう一度お試しください。');
        console.error('イベント取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);
  
  const handleEdit = () => {
    navigate(`/events/${id}/edit`);
  };
  
  const handleDelete = async () => {
    if (window.confirm('このイベントを削除してもよろしいですか？')) {
      try {
        await axios.delete(`/api/events/${id}`);
        navigate('/');
      } catch (err) {
        setError('イベントの削除に失敗しました。後でもう一度お試しください。');
        console.error('イベント削除エラー:', err);
      }
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('ja-JP', options);
  };
  
  // Check if current user is the creator
  const isCreator = isAuthenticated && event && currentUser && event.user_id === currentUser.id;
  
  if (loading) {
    return (
      <LoadingContainer>
        <h2>イベント詳細を読み込み中...</h2>
      </LoadingContainer>
    );
  }
  
  if (error) {
    return (
      <ErrorContainer>
        <h2>エラー</h2>
        <p>{error}</p>
        <Button as={Link} to="/" variant="secondary" style={{ marginTop: '1rem' }}>
          ホームに戻る
        </Button>
      </ErrorContainer>
    );
  }
  
  if (!event) {
    return (
      <ErrorContainer>
        <h2>イベントが見つかりません</h2>
        <p>お探しのイベントは存在しないか、削除された可能性があります。</p>
        <Button as={Link} to="/" variant="secondary" style={{ marginTop: '1rem' }}>
          ホームに戻る
        </Button>
      </ErrorContainer>
    );
  }
  
  return (
    <EventDetailContainer>
      <BackButton to="/">
        ← イベント一覧に戻る
      </BackButton>
      
      <EventCard>
        <Card.Body>
          <EventHeader>
            <div>
              {event.category && <EventCategory>{event.category}</EventCategory>}
              <EventTitle>{event.title}</EventTitle>
            </div>
            
            {isCreator && (
              <EventActions>
                <Button variant="secondary" onClick={handleEdit}>
                  編集
                </Button>
                <Button variant="secondary" onClick={handleDelete}>
                  削除
                </Button>
              </EventActions>
            )}
          </EventHeader>
          
          <EventInfo>
            <InfoItem>
              <span>📅</span>
              <span>{formatDate(event.event_date)}</span>
            </InfoItem>
            
            <InfoItem>
              <span>📍</span>
              <span>{event.location}</span>
            </InfoItem>
            
            {event.capacity && (
              <InfoItem>
                <span>👥</span>
                <span>定員: {event.capacity}</span>
              </InfoItem>
            )}
          </EventInfo>
          
          <EventDescription>
            {event.description}
          </EventDescription>
          
          <EventCreator>
            主催者: {event.creator?.username || '不明'}
          </EventCreator>
        </Card.Body>
      </EventCard>
    </EventDetailContainer>
  );
};

export default EventDetail; 