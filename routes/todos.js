const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 모든 할일 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: todos,
      count: todos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 목록을 가져오는데 실패했습니다.',
      error: error.message
    });
  }
});

// 특정 할일 조회
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다.'
      });
    }
    
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일을 가져오는데 실패했습니다.',
      error: error.message
    });
  }
});

// 새 할일 생성
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: '할일 제목은 필수입니다.'
      });
    }
    
    const todo = new Todo({
      title,
      description,
      priority,
      dueDate
    });
    
    const savedTodo = await todo.save();
    
    res.status(201).json({
      success: true,
      message: '할일이 성공적으로 생성되었습니다.',
      data: savedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 생성에 실패했습니다.',
      error: error.message
    });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;
    
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다.'
      });
    }
    
    // 업데이트할 필드만 설정
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    
    const updatedTodo = await todo.save();
    
    res.json({
      success: true,
      message: '할일이 성공적으로 수정되었습니다.',
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 수정에 실패했습니다.',
      error: error.message
    });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다.'
      });
    }
    
    res.json({
      success: true,
      message: '할일이 성공적으로 삭제되었습니다.',
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 삭제에 실패했습니다.',
      error: error.message
    });
  }
});

// 완료 상태 토글
router.patch('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '할일을 찾을 수 없습니다.'
      });
    }
    
    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    
    res.json({
      success: true,
      message: `할일이 ${updatedTodo.completed ? '완료' : '미완료'}로 변경되었습니다.`,
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '할일 상태 변경에 실패했습니다.',
      error: error.message
    });
  }
});

module.exports = router;
