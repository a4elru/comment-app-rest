'use strict';

const queries = {};

queries.createTableINE_comments = `
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER,
    username TEXT,
    text TEXT
)`;

queries.dropTableIE_comments = `
DROP TABLE IF EXISTS comments`;

queries.insert_comment = `
INSERT INTO comments(
    timestamp, username, text
) VALUES (
    ?,?,?
)`;

queries.get_comment = `
SELECT * FROM comments WHERE id=?`;

queries.get_comments = `
SELECT * FROM comments`;

module.exports = queries;