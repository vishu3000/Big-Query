// Import the Google Cloud client libraries
const { BigQuery } = require("@google-cloud/bigquery");
const { Storage } = require("@google-cloud/storage");

// Instantiate clients
const bigquery = new BigQuery({
  keyFilename: "./BIG_QUERY_SAMPLE.json",
  projectId: "lang-automation-web-vitals",
});
const storage = new Storage();

const bucketName = "cloud-samples-data";
const filename = "./sample.json";

async function loadJSONFromGCS() {
  const datasetId = "First_Sample_1024";
  const tableId = "FirstTable";

  // Configure the load job. For full list of options, see:
  // https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#JobConfigurationLoad
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

  // Load data from a Google Cloud Storage file into the table
  const [job] = await bigquery
    .dataset(datasetId)
    .table(tableId)
    .load(filename, metadata);
  // load() waits for the job to finish
  console.log(`Job ${job.id} completed.`);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}
loadJSONFromGCS();
