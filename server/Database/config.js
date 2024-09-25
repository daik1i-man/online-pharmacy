const { Pool } = require('pg')
const DATABASE_URL = 'postgresql://postgres:pCtItvJgjisuLyvqLRaNcfdQcVBCApjn@junction.proxy.rlwy.net:22922/railway'

const pool = new Pool({
    connectionString: DATABASE_URL,
})

module.exports = pool;