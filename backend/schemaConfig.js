const schemas = {
  Schema_1: [
    { name: "Name", type: "STRING", mode: "REQUIRED" },
    { name: "Age", type: "INTEGER" },
    { name: "Weight", type: "FLOAT" },
    { name: "IsMagic", type: "BOOLEAN" },
  ],
  Schema_2: [
    { name: "Name", type: "STRING", mode: "REQUIRED" },
    { name: "Profession", type: "STRING" },
    { name: "Experience", type: "INTEGER" },
  ],

  Schema_3: [
    { name: "Name", type: "STRING", mode: "REQUIRED" },
    { name: "Country", type: "STRING" },
    { name: "Age", type: "INTEGER" },
  ],
};

module.exports = { schemas };
