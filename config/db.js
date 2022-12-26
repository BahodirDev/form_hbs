// 5.	const Pool  = require('pg').Pool;
const Pool = require('pg').Pool
const dot = require('dotenv');
dot.config()


const pool = new Pool({
    port:process.env.DB_PORT,
    password:process.env.PASSWORD,
    database:process.env.NAME,
    host:process.env.HOST,
    user:process.env.USER
});

module.exports = pool;
