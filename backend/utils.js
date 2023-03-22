const { BigQuery } = require("@google-cloud/bigquery");
const bigQuery = new BigQuery({
  keyFilename: "./BIG_QUERY_SAMPLE.json",
  projectId: "lang-automation-web-vitals",
});
const location = "US";

const getData = async (projectId, dataset, table) => {
  const query = `SELECT * from \`${projectId}.${dataset}.${table}\`
       LIMIT 100`;

  const options = {
    query: query,
    location,
  };
  const [jobs] = await bigQuery.createQueryJob(options);
  console.log(`Job '${jobs.id}' started.\n`);

  const [rows] = await jobs.getQueryResults();
  console.log("Resulted Rows :");

  rows.map((element) => {
    console.log(element);
  });

  return rows;
};

//To be used
const postData_stream = async (projectId, dataset, table, payload) => {
  const rows = [
    {
      Name: "Vishu",
      Age: 22,
    },
    {
      Name: "Vishu_2",
      Age: 23,
      Weight: 75,
      IsMagic: true,
    },
  ];
  try {
    //  await bigQuery.dataset(dataset).table(table).insert(payload);
    await bigQuery.dataset(dataset).table(table).insert(rows);
    console.log(`Inserted ${rows.length} rows`);
  } catch (e) {
    console.error(JSON.stringify(e, null, 2));
    throw e;
  }
  return rows;
};

//To be deprecated
const postData_batch = async (projectId, dataset, table) => {
  const filename = "./sample.json";

  const metadata = {
    sourceFormat: "NEWLINE_DELIMITED_JSON",
    schema: {
      fields: [
        { name: "Name", type: "STRING", mode: "REQUIRED" },
        { name: "Age", type: "INTEGER" },
        { name: "Weight", type: "FLOAT" },
        { name: "IsMagic", type: "BOOLEAN" },
      ],
    },
    location: "US",
  };
  const [job] = await bigQuery
    .dataset(dataset)
    .table(table)
    .load(filename, metadata);
  // load() waits for the job to finish
  console.log(`Job ${job.id} completed.`);

  console.log(job);
  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
};

const new_table = async (projectId, dataset, table, schema) => {
  const option = {
    location,
    schema,
  };

  const [table_] = await bigQuery.dataset(dataset).createTable(table, option);

  console.log(`Table ${table_.id} created`);

  return table_.id;
};

const new_DS = async (projectId, dataset) => {
  const [dataSet] = await bigQuery.createDataset(dataset, location);
  console.log(`Dataset ${dataSet.id} created`);
  return dataSet.id;
};

module.exports = {
  getData,
  postData_batch,
  postData_stream,
  new_table,
  new_DS,
};
