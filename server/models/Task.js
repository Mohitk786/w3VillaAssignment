const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String},
  description: String,
  dueDate: Date,
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // The user assigned to this task
  taskList: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskList' }    // Reference back to the task list
});

taskSchema.pre('save', function (next) {
  const now = new Date();
  const oneWeekFromNow = new Date(now);
  oneWeekFromNow.setDate(now.getDate() + 7); 

  if (this.dueDate <= now) {
      return next(new Error('Due date must be in the future.'));
  }
  if (this.dueDate > oneWeekFromNow) {
      return next(new Error('Due date must not be more than one week from today.'));
  }

  next();
});

module.exports = mongoose.model('Task', taskSchema);