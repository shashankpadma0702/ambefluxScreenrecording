const db = require('../config/database');

class Recording {
  static create(recordingData, callback) {
    const { filename, filepath, filesize } = recordingData;
    const sql = `INSERT INTO recordings (filename, filepath, filesize) VALUES (?, ?, ?)`;
    
    db.run(sql, [filename, filepath, filesize], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID, filename, filepath, filesize, createdAt: new Date() });
    });
  }

  static getAll(callback) {
    const sql = `SELECT * FROM recordings ORDER BY createdAt DESC`;
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }

  static getById(id, callback) {
    const sql = `SELECT * FROM recordings WHERE id = ?`;
    
    db.get(sql, [id], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }
}

module.exports = Recording;