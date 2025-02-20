const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'], // ENUM values
    default: 'todo'
  },
  category: {
    type: String,
    enum: ['Work', 'Personal'], // ENUM values
    default: 'Personal',
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date
  },
  fileName: {
    type: String,
    default: ''
  },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > Date.now();
      },
      message: 'Due date must be in the future!',
    },
}
});

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;
