import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { Link } from 'react-router-dom';

const EditEventContainer = styled.div`
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

const LoadingContainer = styled(Card)`
  padding: 2rem;
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
`;

const EditEvent = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/api/events/${id}`);
        const event = response.data.event;
        
        // Format date for datetime-local input
        const eventDate = new Date(event.event_date);
        const formattedDate = eventDate.toISOString().slice(0, 16);
        
        setFormData({
          title: event.title,
          description: event.description,
          location: event.location,
          event_date: formattedDate,
          category: event.category || '',
          capacity: event.capacity || ''
        });
      } catch (err) {
        setError('イベント詳細の取得に失敗しました。後でもう一度お試しください。');
        console.error('イベント取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);
  
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
      
      await axios.put(`/api/events/${id}`, eventData);
      
      // Redirect to the event page
      navigate(`/events/${id}`);
    } catch (err) {
      console.error('イベント更新エラー:', err);
      setError(err.response?.data?.error || 'イベントの更新に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate(`/events/${id}`);
  };
  
  // 定義済みカテゴリのリスト
  const predefinedCategories = [
    'ビジネス',
    'テクノロジー',
    'スポーツ',
    '音楽',
    'アート',
    '料理',
    '教育',
    '健康',
    '旅行',
    'その他'
  ];
  
  if (loading) {
    return (
      <LoadingContainer>
        <h2>イベント情報を読み込み中...</h2>
      </LoadingContainer>
    );
  }
  
  if (error) {
    return (
      <ErrorContainer>
        <h2>エラーが発生しました</h2>
        <p>{error}</p>
        <Button as={Link} to="/" variant="secondary">
          ホームに戻る
        </Button>
      </ErrorContainer>
    );
  }
  
  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <EditEventContainer>
      <PageTitle>イベントを編集</PageTitle>
      
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
                label="カテゴリー"
                type="select"
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                error={errors.category}
                options={[
                  { value: '', label: 'カテゴリーを選択' },
                  ...predefinedCategories.map(cat => ({ value: cat, label: cat }))
                ]}
              />
              
              <Input
                label="定員（任意）"
                type="number"
                name="capacity"
                placeholder="参加者の最大数"
                value={formData.capacity || ''}
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
                {isSubmitting ? '更新中...' : '変更を保存'}
              </Button>
            </ButtonGroup>
          </form>
        </Card.Body>
      </FormCard>
    </EditEventContainer>
  );
};

export default EditEvent; 