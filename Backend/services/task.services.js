const taskModel = require('../models/todo.models');

module.exports.getAllTasks = async () => {
  try {
    const tasks = await taskModel.find({});
    return tasks;
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    throw error;
  }
};

// GET Task by Title
module.exports.getTaskByTitle = async (title) => {
  try {
    const task = await taskModel.findOne({ title });
    return task;
  } catch (error) {
    console.error('Error retrieving task by title:', error);
    throw error;
  }
};

// DELETE Task by Title
module.exports.deleteTask = async (title) => {
  try {
    const deletedTask = await taskModel.findOneAndDelete({ title });
    return deletedTask;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// UPDATE Task by Title
module.exports.updateTask = async (title, updatedData) => {
  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { title },
      { $set: updatedData },
      { new: true } // Return the updated document
    );
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

module.exports.createTask = async ({title, description, status, fileName, dueDate, category}) =>{


    try{
        const result = await taskModel.create({
            title,
            description,
            status, fileName, dueDate, category
        })

    }
    catch(e)
    {
        console.log("Error in creating task", e)
    }
}

module.exports.updateStatus = async ({title, status}) =>{
  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { title },
      { $set: {status} },
      { new: true } // Return the updated document
    );
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }


}