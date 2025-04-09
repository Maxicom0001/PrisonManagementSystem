import mysql from 'mysql2/promise';

async function run() {
    // Create the connection pool
    const pool = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'jail'
    });
  
    try {
      // Use pool.query to run a query
      const [rows] = await pool.query("SELECT * FROM convicts");
      console.log('Rows:', rows); // Log the rows fetched from DB
    } catch (err) {
      console.error('Error executing query:', err);
    } finally {
      // Don't forget to close the pool when done
      await pool.end();
    }
  }
  
  // Call the run function
  run();