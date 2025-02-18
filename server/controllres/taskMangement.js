const TaskList = require('../models/TaskList');
const Task = require('../models/Task');
const User = require('../models/User');


// POST /taskLists/:listId/tasks
exports.addTask =  async (req, res) => {
  try {
    let { taskName, description, dueDate, status, assignedUser } = req.body.formData;

    const isAlready = await Task.findOne({name:taskName})
    if(isAlready){
      return res.status(400).json({
        success:false,
        message:"task Name already exist"
      })
    }

    assignedUser = assignedUser ? assignedUser : null;

    const newTask = new Task({
      name:taskName,
      description,
      dueDate,
      status,
      assignedUser,
      taskList: req.params.listId
    });
    await newTask.save();

    if(assignedUser){
      const user = await User.findByIdAndUpdate(assignedUser, {
        $push: {
          assignedTasks: newTask._id, 
        }
      }, {new:true});
    }


    //  push the new task into the list's tasks array
    const taskList = await TaskList.findById(req.params.listId);

    taskList.tasks.push(newTask._id);

    await taskList.save();
    res.status(201).json(newTask);

  } catch (error) {
    res.status(500).json({ 
      message:error.message
    });
  }
}


exports. updateTask =  async (req, res) => {
    try {
      const status = req.body.newStatus;
      const {taskId} = req.params;
  
      // Update task status
      const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);

    } catch (error) {
      res.status(500).json({ error: 'Failed to update task status' });
    }
}


exports.deleteTask =  async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.taskId);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Also remove the task from the task list
      const taskList = await TaskList.findById(task.taskList);
      taskList.tasks = taskList.tasks.filter((t) => t.toString() !== req.params.taskId);
      await taskList.save();
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
}
  

exports.addList = async(req, res)=>{
  try{
    const {name} = req.body;
    const userId = req.user.id;
    
    const isExist = await TaskList.findOne({name:name});
    if(isExist){
      res.status(400).json({
        message:"List Name already Exist"
      })
    }
    const newList = new TaskList({
      name:name,
      owner:userId
    })
    await newList.save()

    await User.findByIdAndUpdate(userId, {
      $push:{
        TaskList:newList._id
      }
    })


    res.status(201).json(newList);

  }catch(err){
    console.log(err.message)
  }
}

exports.deleteList  = async (req,res)=>{
  try{
    const {listId} = req.params
    // Delete all tasks associated with the list
    await Task.deleteMany({taskList:listId})
    await TaskList.findByIdAndDelete(listId)

    return res.status(200).json({
      success: true,
      message: "List deleted successfully",
    })


  }catch(err){
    return res.status(400).json({
      success: false,
      message: "failed to delete List",
    })
  }

}

exports.fetchTaskLists = async (req, res) => {
  try {
    const userId = req.user.id;
    const data =  await TaskList.find({ owner: userId }).populate('tasks');

    return res.status(200).json({
      success: true,
      message: "Task lists fetched successfully",
      taskLists: data, 
    });

  } catch (err) {
    console.error(err.message); 
    return res.status(500).json({ 
      success: false,
      message: "Failed to fetch task lists",
    });
  }
};

exports.fetchUsers =  async (req, res) => {
    try {
      const users = await User.find({}); // Fetch all users
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
}


exports.fetchAllLists = async (req,res)=>{
  try{
    const lists = await TaskList.find({})
    .populate({
      path: 'owner',      
      select: 'firstName lastName email' 
    })
    .populate({
      path: 'tasks',      
      select: 'name description dueDate status' 
    });

    res.status(200).json(lists);

  }catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Failed to fetch task lists' });
  }
}
  

exports.deleteUser = async(req,res) => {
  try{  

      const {userId} = req.params
      const taskLists = await TaskList.find({ owner: userId });

      for(let i=0; i<taskLists.length; i++){
        const listId = taskLists[i];
        await Task.deleteMany({taskList: listId});
      }

      await TaskList.deleteMany({ owner: userId });

      await User.findByIdAndDelete(userId)

      res.status(200)

  }catch(err){
    console.log(err.message)
    res.status(500).json({ error: 'Failed to deleteUser' });
  }
}

exports.getAssignedTasks = async(req,res)=>{
  try{
      console.log("ok")
      const userId = req.user.id;
      const user = await User.findById(userId).populate("assignedTasks")
      console.log(user);

      res.status(200).json({
        data : user.assignedTasks
      })

  }catch(err){
    res.status(400).json({
      message:"failed to fetch assigned tasks"
    })
  }
}