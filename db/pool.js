const { Pool } = require("pg")
require('dotenv').config()

module.exports = new Pool({
    host: process.env.HOST,
    user: process.env.PGUSERNAME,
    database: process.env.DBNAME,
    password: process.env.PGPASSWORD,
    port: process.env.DBPORT,
});

