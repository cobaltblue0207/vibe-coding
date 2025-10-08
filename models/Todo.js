const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '할일 제목은 필수입니다.'],
    trim: true,
    maxlength: [100, '제목은 100자 이하로 입력해주세요.']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, '설명은 500자 이하로 입력해주세요.']
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 업데이트 시 updatedAt 자동 갱신
todoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Todo', todoSchema);
