const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const fs = require("fs").promises;
const readline = require("readline");
const stream = require("stream");

async function createSqlScript() {
  let sqlScript = "";
  let columns = [];

  const fileContent = await fs.readFile("data/data.csv", "utf8");
  const rl = readline.createInterface({
    input: stream.Readable.from(fileContent),
    output: process.stdout,
    console: false,
  });

  rl.on("line", (line) => {
    if (!columns.length) {
      columns = line.replace(/^\uFEFF/, "").split(",");
      sqlScript += `-- Up\nCREATE TABLE measurements (\n    ${columns[0]} TEXT,\n    ${columns[1]} INTEGER,\n    ${columns[2]} REAL,\n    ${columns[3]} REAL\n);\n\n`;
    } else {
      const values = line.split(",");
      sqlScript += `INSERT INTO measurements (${columns.join(", ")}) VALUES ('${
        values[0]
      }', ${values[1]}, ${values[2]}, ${values[3]});\n`;
    }
  });

  rl.on("close", async () => {
    sqlScript += "-- Down\nDROP TABLE measurements;\n";
    await fs.writeFile("migrations/001-measurements-table.sql", sqlScript, {
      encoding: "utf8",
    });
  });
}

(async () => {
  // create a migration script in the "migrations" folder.
  await createSqlScript();

  // open the database
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  // migrate
  await db.migrate({ force: "last" });
})();
