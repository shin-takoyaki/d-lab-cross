import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from './UI/Card';
import Button from './UI/Button';

const EventCardContainer = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const EventDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  flex-grow: 1;
  
  /* Limit to 3 lines with ellipsis */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventCategory = styled.span`
  display: inline-block;
  background-color: var(--accent-primary);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-right: 0.5rem;
`;

const EventDate = styled.span`
  margin-right: 1rem;
`;

const EventLocation = styled.span``;

const EventFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const EventCreator = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const EventCard = ({ event }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ja-JP', options);
  };
  
  // Truncate description if needed
  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  return (
    <EventCardContainer interactive>
      <Card.Body>
        {event.category && <EventCategory>{event.category}</EventCategory>}
        <EventTitle>{event.title}</EventTitle>
        
        <EventInfo>
          <EventDate>📅 {formatDate(event.event_date)}</EventDate>
          <EventLocation>📍 {event.location}</EventLocation>
        </EventInfo>
        
        <EventDescription>
          {truncateDescription(event.description)}
        </EventDescription>
        
        <EventFooter>
          <EventCreator>
            主催者: {event.creator?.username || '不明'}
          </EventCreator>
          
          <Button 
            variant="secondary" 
            as={Link} 
            to={`/events/${event.id}`}
            size="small"
          >
            詳細を見る
          </Button>
        </EventFooter>
      </Card.Body>
    </EventCardContainer>
  );
};

export default EventCard; 