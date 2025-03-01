import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EventCard from '../components/EventCard';
import Pagination from '../components/Pagination';
import Card from '../components/UI/Card';

const HomeContainer = styled.div`
  padding: 2rem 0;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  
  span {
    color: var(--accent-primary);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const LoadingContainer = styled(Card)`
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
`;

const ErrorContainer = styled(Card)`
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
  color: var(--error);
`;

const NoEventsContainer = styled(Card)`
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
`;

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/api/events?page=${currentPage}`);
        
        setEvents(response.data.events);
        setTotalPages(response.data.pages);
        setTotalEvents(response.data.total);
      } catch (err) {
        setError('イベントの取得に失敗しました。後でもう一度お試しください。');
        console.error('イベント取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [currentPage]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>
          あなたにぴったりの<span>イベント</span>を見つけよう
        </HeroTitle>
        <HeroSubtitle>
          あなたの興味に合ったイベントを発見し、つながりましょう。
          コミュニティに参加して、ネットワークを広げましょう。
        </HeroSubtitle>
      </Hero>
      
      {loading ? (
        <LoadingContainer>
          <h3>イベントを読み込み中...</h3>
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>
          <h3>{error}</h3>
        </ErrorContainer>
      ) : events.length === 0 ? (
        <NoEventsContainer>
          <h3>イベントが見つかりませんでした</h3>
          <p>最初のイベントを作成しましょう！</p>
        </NoEventsContainer>
      ) : (
        <>
          <EventsGrid>
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </EventsGrid>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </HomeContainer>
  );
};

export default Home; 