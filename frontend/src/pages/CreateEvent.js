import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const CreateEventContainer = styled.div`
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
  text-align: center;
`;

const FormCard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 107, 107, 0.1);
  border-left: 3px solid var(--error);
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: var(--error);
`;

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    event_date: '',
    category: '',
    capacity: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'タイトルは必須です';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '説明は必須です';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = '場所は必須です';
    }
    
    if (!formData.event_date) {
      newErrors.event_date = 'イベント日時は必須です';
    } else {
      const eventDate = new Date(formData.event_date);
      const now = new Date();
      
      if (eventDate < now) {
        newErrors.event_date = 'イベント日時は過去の日付にできません';
      }
    }
    
    if (formData.capacity && isNaN(Number(formData.capacity))) {
      newErrors.capacity = '定員は数字で入力してください';
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
      setError(null);
      
      // Format data for API
      const eventData = {
        ...formData,
        capacity: formData.capacity ? Number(formData.capacity) : null
      };
      
      const response = await axios.post('/api/events', eventData);
      
      // Redirect to the new event page
      navigate(`/events/${response.data.event.id}`);
    } catch (err) {
      console.error('イベント作成エラー:', err);
      setError(err.response?.data?.error || 'イベントの作成に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/');
  };
  
  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <CreateEventContainer>
      <PageTitle>新しいイベントを作成</PageTitle>
      
      <FormCard>
        <Card.Body>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <form onSubmit={handleSubmit}>
            <Input
              label="イベントタイトル"
              type="text"
              name="title"
              placeholder="イベントタイトルを入力"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />
            
            <Input
              label="説明"
              type="textarea"
              name="description"
              placeholder="イベントの説明を入力"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />
            
            <FormGroup>
              <Input
                label="場所"
                type="text"
                name="location"
                placeholder="イベントの開催場所"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
              />
              
              <Input
                label="イベント日時"
                type="datetime-local"
                name="event_date"
                min={today}
                value={formData.event_date}
                onChange={handleChange}
                error={errors.event_date}
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                label="カテゴリー（任意）"
                type="text"
                name="category"
                placeholder="例：音楽、スポーツ、テクノロジー"
                value={formData.category}
                onChange={handleChange}
                error={errors.category}
              />
              
              <Input
                label="定員（任意）"
                type="number"
                name="capacity"
                placeholder="参加者の最大数"
                value={formData.capacity}
                onChange={handleChange}
                error={errors.capacity}
              />
            </FormGroup>
            
            <ButtonGroup>
              <Button 
                variant="secondary" 
                type="button" 
                onClick={handleCancel}
              >
                キャンセル
              </Button>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? '作成中...' : 'イベントを作成'}
              </Button>
            </ButtonGroup>
          </form>
        </Card.Body>
      </FormCard>
    </CreateEventContainer>
  );
};

export default CreateEvent; 