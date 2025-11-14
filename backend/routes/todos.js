const express = require('express');
const { Op } = require('sequelize');
const { Todo } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all todos for the authenticated user
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, completed, priority, search } = req.query;
    const offset = (page - 1) * limit;

    // Build where clause
    const where = { userId: req.user.id };
    
    if (completed !== undefined) {
      where.completed = completed === 'true';
    }
    
    if (priority) {
      where.priority = priority;
    }
    
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const todos = await Todo.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      todos: todos.rows,
      pagination: {
        total: todos.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(todos.count / limit)
      }
    });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ todo });
  } catch (error) {
    console.error('Get todo error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await Todo.create({
      title,
      description,
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Todo created successfully',
      todo
    });
  } catch (error) {
    console.error('Create todo error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    const todo = await Todo.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Update fields if provided
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate ? new Date(dueDate) : null;

    await todo.save();

    res.json({
      message: 'Todo updated successfully',
      todo
    });
  } catch (error) {
    console.error('Update todo error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors.map(e => e.message) 
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle todo completion status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json({
      message: 'Todo status updated successfully',
      todo
    });
  } catch (error) {
    console.error('Toggle todo error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.destroy();

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete all completed todos
router.delete('/completed/all', async (req, res) => {
  try {
    const deletedCount = await Todo.destroy({
      where: { 
        userId: req.user.id,
        completed: true 
      }
    });

    res.json({ 
      message: `${deletedCount} completed todos deleted successfully`,
      deletedCount 
    });
  } catch (error) {
    console.error('Delete completed todos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
