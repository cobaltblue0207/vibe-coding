const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5009;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// MongoDB 연결
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB 연결 성공!');
  })
  .catch((error) => {
    console.error('❌ MongoDB 연결 실패:', error);
  });

// 라우터 연결
const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo Backend API가 실행 중입니다!',
    endpoints: {
      'GET /api/todos': '모든 할일 조회',
      'GET /api/todos/:id': '특정 할일 조회',
      'POST /api/todos': '새 할일 생성',
      'PUT /api/todos/:id': '할일 수정',
      'DELETE /api/todos/:id': '할일 삭제',
      'PATCH /api/todos/:id/toggle': '완료 상태 토글'
    }
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다!`);
});
