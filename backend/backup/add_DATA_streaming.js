const { BigQuery } = require("@google-cloud/bigquery");

const location = "US";

const bigQuery = new BigQuery({
  keyFilename: "./BIG_QUERY_SAMPLE.json",
  projectId: "lang-automation-web-vitals",
});

const insert_row = async (dataSetId, tableId) => {
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
    await bigQuery.dataset(dataSetId).table(tableId).insert(rows);

    console.log(`Inserted ${rows.length} rows`);
  } catch (e) {
    console.error(JSON.stringify(e, null, 2));
  }
};

const main = async () => {
  await insert_row("First_Sample_1024", "First Table");
};

main();
