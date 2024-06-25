const { Pool } = require('pg')
const DATABASE_URL = 'postgresql://uwzdgesqjr03dg0g3v55:6wcRtF8CpHfNSl7JLWNn@b09urzatr9jcssfmufl5-postgresql.services.clever-cloud.com:5237/b09urzatr9jcssfmufl5'

const pool = new Pool({
    connectionString: DATABASE_URL,
})

module.exports = pool;