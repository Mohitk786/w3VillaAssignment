const mongoose = require('mongoose');

const taskListSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
    trim: true
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('TaskList', taskListSchema);