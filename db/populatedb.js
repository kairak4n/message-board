const { Client } = require('pg')
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(255),
  username VARCHAR(20),
  added TIMESTAMP
);

INSERT INTO messages (text, username, added)
VALUES
  ('Hi there!', 'Anakin', CURRENT_TIMESTAMP),
  ('Hello World!', 'Obi-Wan', CURRENT_TIMESTAMP),
  ('May the force be with you!', 'Yoda', CURRENT_TIMESTAMP);
`

async function main() {
    console.log("seeding...")
    const client = new Client({
        connectionString: `postgresql://${process.env.PGUSERNAME}:${process.env.PGPASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DBNAME}`,
    })
    await client.connect();
    await client.query(SQL);
    await client.end()
    console.log("done")
}

main()