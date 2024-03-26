const sqlite3 = require('sqlite3').verbose();

/**
 * Represents a singleton SQLite database instance.
 */
class DatabaseInstance {
  
  /**
   * Creates a new DatabaseInstance.
   * This constructor ensures that only one instance of the database is created.
   */
  constructor() {
    if (!DatabaseInstance.instance) {
      this.db = new sqlite3.Database('tasks.db');
      DatabaseInstance.instance = this; // Store the instance to ensure singleton behavior

      this.createTable(); // Create the 'tasks' table if it doesn't exist
    }

    return DatabaseInstance.instance;
  }

  /**
   * Creates the 'tasks' table if it doesn't exist.
   */
  createTable() {
    this.db.serialize(() => {
      this.db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='tasks'", (err, row) => {
        if (err) {
          console.error('Error checking if table exists:', err.message);
          return;
        }

        if (!row) {
          this.db.run('CREATE TABLE tasks (id INTEGER PRIMARY KEY, description TEXT, completed TEXT)');
          console.log('Table created');
        } else {
          console.log('Table already exists');
        }
      });
    });
  }

   /**
   * Returns the SQLite database instance.
   * @returns {sqlite3.Database} The SQLite database instance.
   */
  getInstance() {
    return this.db;
  }
}

// Export an instance of DatabaseInstance to be used in other modules
module.exports = new DatabaseInstance().getInstance();