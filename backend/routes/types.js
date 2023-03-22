const express = require("express");
const {
  getSchema_1,
  postSchema_1_batch,
  Create_newTable,
  Create_newDS,
  Create_DS_table,
} = require("../controllers/requestsController");

const router = express.Router();

// GET
router.get("/First_Sample_1024/FirstTable", getSchema_1);
// router.get("/get", getSchema_1);

// post
router.post("/First_Sample_1024/FirstTable/post", postSchema_1_batch);

//create new table
router.post("/First_Sample_1024/newtable", Create_newTable);

//create new data set
router.post("/newDataSet", Create_newDS);

//create new data set with a table
router.post("/newDataSet&Table", Create_DS_table);

module.exports = router;
