var express = require('express');
var router = express.Router();
var sqlite = require("better-sqlite3");


/**
 * @openapi
 * /:
 *   get:
 *     description: No inputs required
 *     responses:
 *       200:
 *         description: Returns an object of books.
 */
router.get('/', function (req, res, next) {
  var db = new sqlite('database.db');
  var books = db.prepare("SELECT * FROM books").all();
  res.json({ books: books })
});

/**
 * @openapi
 * /:
 *   post:
 *     description: 'Book details required in the body of the request e.g., {"title": "Machine Learning", "author": "Tom Mitchell", "year": 1999 }'
 *     responses:
 *       201:
 *         description: Returns a blank object.
 */
router.post('/', function (req, res, next) {
  var db = new sqlite('database.db');
  db.prepare('INSERT INTO books (title, author, year) VALUES (?,?,?)').run(req.body.title, req.body.author, req.body.year);
  res.status(201).json({})
});


/**
 * @openapi
 * /:
 *   delete:
 *     description: 'ID required in the body of the request e.g., {"book_id": 1}'
 *     responses:
 *       204:
 *         description: Returns a blank object.
 */
router.delete('/', function (req, res, next) {
  var db = new sqlite('database.db');
  db.prepare('DELETE FROM books where id = (?)').run(req.body.book_id);
  res.status(204).json({})
});

/**
 * @openapi
 * /:
 *   put:
 *     description: 'Book details required in the body of the request e.g., {"title": "Machine Learning", "author": "Tom Mitchell", "year": 1999, "book_id": 1}'
 *     responses:
 *       204:
 *         description: Returns a blank object.
 */
router.put('/', function (req, res, next) {
  var db = new sqlite('database.db');
  db.prepare('UPDATE books SET title = ?, author = ?, year = ? where id = (?)').run(req.body.title, req.body.author, req.body.year, req.body.book_id);
  res.status(204).json({})
});

module.exports = router;
