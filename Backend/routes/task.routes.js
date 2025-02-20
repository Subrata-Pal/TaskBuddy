const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const taskService = require("../services/task.services");

// GET Task by Title
router.get("/task", async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    const task = await taskService.getTaskByTitle(title);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task retrieved successfully.", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving task.", error: error.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({ message: "Tasks retrieved successfully.", tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving tasks.", error: error.message });
  }
});

// DELETE Task by Title
router.delete("/deleteTask", async (req, res) => {
  try {
    const { title } = req.query;
    
    const deletedTask = await taskService.deleteTask(title);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully.", deletedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task.", error: error.message });
  }
});

// UPDATE Task by Title
router.put(
  "/updateTask",
  [
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string.")
      .isLength({ max: 300 })
      .withMessage("Description must not exceed 300 characters."),
    body("status")
      .optional()
      .isIn(["todo", "in-progress", "completed"])
      .withMessage("Status must be one of todo, in-progress, or completed."),
    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("DueDate must be a valid date in ISO 8601 format."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.query;
    const updatedData = req.body;

    try {
      const updatedTask = await taskService.updateTask(title, updatedData);
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found." });
      }

      res
        .status(200)
        .json({ message: "Task updated successfully.", updatedTask });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating task.", error: error.message });
    }
  }
);

router.post(
  "/createTask",
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title must be a string.")
    .isLength({ max: 100 })
    .withMessage("Title must not exceed 100 characters."),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string.")
    .isLength({ max: 300 })
    .withMessage("Description must not exceed 300 characters."),
  body("fileName")
    .optional()
    .isString()
    .withMessage("File type must be a string.")
    .withMessage(
      "Invalid file type. Allowed types: image/png, image/jpeg, application/pdf"
    ),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("UploadedAt must be a valid date in ISO 8601 format."),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, fileName, dueDate, category } =
      req.body;
    const taskData = await taskService.createTask({
      title,
      description,
      status,
      fileName,
      dueDate,
      category,
    });
    res.status(200).json({ message: "Task created successfully.", taskData });
  }
);

router.post(
  "/updateStatus",
  body("title")
  .trim()
  .notEmpty()
  .withMessage("Title is required.")
  .isString()
  .withMessage("Title must be a string.")
  .isLength({ max: 100 })
  .withMessage("Title must not exceed 100 characters."),
  body("status")
    .isIn(["todo", "in-progress", "completed"])
    .withMessage("Status must be one of todo, in-progress, or completed."),

    async (req, res) =>{
      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, status } = req.body;
    const taskData = await taskService.updateStatus({
      title, status
    });
    res.status(200).json({ message: "Task updated successfully.", taskData });
    }
);

module.exports = router;
