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
      newErrors.event_date = '日付は必須です';
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
      
      // 数値フィールドの変換
      const eventData = {
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : null
      };
      
      const response = await axios.post('/api/events', eventData);
      
      navigate(`/events/${response.data.event.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'イベントの作成に失敗しました');
      console.error('イベント作成エラー:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/');
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
              value={formData.title}
              onChange={handleChange}
              placeholder="イベントのタイトルを入力してください"
              error={errors.title}
            />
            
            <Input 
              label="説明"
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="イベントの詳細な説明を入力してください"
              error={errors.description}
            />
            
            <FormGroup>
              <Input 
                label="場所"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="イベントの開催場所"
                error={errors.location}
              />
              
              <Input 
                label="開催日時"
                type="datetime-local"
                name="event_date"
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
                value={formData.category}
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
                value={formData.capacity}
                onChange={handleChange}
                placeholder="定員がある場合は入力してください"
                error={errors.capacity}
              />
            </FormGroup>
            
            <ButtonGroup>
              <Button 
                type="button" 
                variant="secondary" 
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