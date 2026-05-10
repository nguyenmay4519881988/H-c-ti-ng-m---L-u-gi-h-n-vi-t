import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findLessonById } from '@/src/mockData';
import { LessonDetail } from '@/src/components/sections/LessonDetail';

export const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = id ? findLessonById(id) : null;

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mist">
        <div className="text-center space-y-4">
           <h2 className="text-2xl font-bold text-stone-900">Không tìm thấy bài học</h2>
           <button 
             onClick={() => navigate('/learn')}
             className="px-6 py-3 bg-forest text-white rounded-xl font-bold"
           >
             Quay lại danh sách
           </button>
        </div>
      </div>
    );
  }

  return (
    <LessonDetail 
      lesson={lesson} 
      onClose={() => navigate('/learn')} 
    />
  );
};
