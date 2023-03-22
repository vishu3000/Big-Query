const {
  getData,
  postData_batch,
  postData_stream,
  new_table,
  new_DS,
} = require("../utils");
const projectId = "lang-automation-web-vitals";

// get all rows
const getSchema_1 = async (req, res) => {
  const rows = await getData(projectId, "First_Sample_1024", "FirstTable");
  // console.log(rows.length);

  res.status(200).json(rows);
};
// const getSchema_1 = async (req, res) => {
//   const { dataset, table } = req.params;
//   console.log(dataset, table);
//   const [rows] = await getData(projectId, dataset, table);

//   res.status(200).json(rows);
// };

// post through stream method
const postSchema_1_stream = async (req, res) => {
  const { Name, Age, Weight, isMagic } = req.body;

  let emptyFields = [];

  if (!Name) {
    emptyFields.push("Name");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in Name field", emptyFields });
  }

  try {
    const [row] = await postData_stream(
      projectId,
      "First_Sample_1024",
      "FirstTable",
      req.body
    );
    res.status(200).json(row);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// post through batch method
const postSchema_1_batch = async (req, res) => {
  try {
    await postData_batch(projectId, "First_Sample_1024", "FirstTable");
    res.status(200).json("Sucessfull Insertion of DATA!!!!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create table
const Create_newTable = async (req, res) => {
  const { table, schema } = req.body;

  let emptyFields = [];

  if (!table) {
    console.log(req.body);
    emptyFields.push("Table Name");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in Name field", emptyFields });
  }

  try {
    const table_id = await new_table(
      projectId,
      "First_Sample_1024",
      table,
      schema
    );
    res
      .status(200)
      .json(`Sucessfull Creation  of table with id ${table_id}!!!!`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create table
const Create_newDS = async (req, res) => {
  const { dataset } = req.body;

  let emptyFields = [];

  if (!dataset) {
    emptyFields.push("Dataset Name");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in Name field", emptyFields });
  }

  try {
    const ds_id = await new_DS(projectId, dataset);
    res
      .status(200)
      .json(`Sucessfull Creation  of dataset with id ${ds_id}!!!!`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const Create_DS_table = async (req, res) => {
  const { dataset, table, schema } = req.body;
  let emptyFields = [];

  if (!dataset) {
    emptyFields.push("Dataset Name");
  }
  if (!table) {
    emptyFields.push("Table Name");
  }
  if (!schema) {
    emptyFields.push("schema");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in fields", emptyFields });
  }
  try {
    const ds_id = await new_DS(projectId, dataset);
    const table_id = await new_table(projectId, ds_id, table, schema);
    res
      .status(200)
      .json(
        `Sucessfull Creation  of dataset ${ds_id} with table ${table_id} !!!!`
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSchema_1,
  postSchema_1_batch,
  Create_newTable,
  Create_newDS,
  Create_DS_table,
};
