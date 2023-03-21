const { BigQuery } = require("@google-cloud/bigquery");

const location = "US";

const bigQuery = new BigQuery({
  keyFilename: "./BIG_QUERY_SAMPLE.json",
  projectId: "lang-automation-web-vitals",
});

const createDataSet = async (dataSetName) => {
  const [dataSet] = await bigQuery.createDataset(dataSetName, location);
  console.log(`Dataset ${dataSet.id} created`);
  return dataSet.id;
};

const createTable = async (dataSetId, tableName) => {
  const schema = [
    { name: "Name", type: "STRING", mode: "REQUIRED" },
    { name: "Age", type: "INTEGER" },
    { name: "Weight", type: "FLOAT" },
    { name: "IsMagic", type: "BOOLEAN" },
  ];

  const option = {
    location,
    schema,
  };

  const [table] = await bigQuery
    .dataset(dataSetId)
    .createTable(tableName, option);

  console.log(`Table ${table.id} created`);

  return table.id;
};

const main = async () => {
  const dataSetId = await createDataSet("First_Sample_1024");
  await createTable(dataSetId, "FirstTable");
};

main();
