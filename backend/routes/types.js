const express = require("express");
const {
  getSchema_1,
  getSchema_2,
  getSchema_3,
  postSchema_1,
  postSchema_2,
  postSchema_3,
} = require("../controllers/workoutController");

const router = express.Router();

// GET all workouts
router.get("/schema_1", getSchema_1);

// GET a single workout
router.get("/schema_2", getSchema_2);

// POST a new workout
router.get("/schema_3", getSchema_3);

// DELETE a workout
router.post("/post/schema_1", postSchema_1);

// UPDATE a workout
router.post("/post/schema_2", postSchema_2);

// UPDATE a workout
router.post("/post/schema_3", postSchema_3);

module.exports = router;
