const bookController = require('../controllers/bookControllers');
const express = require('express');
const tokenMatch = require('../middleware/routeProtect').isTokenCorrect;


const router = express.Router();
router.post('/',tokenMatch,bookController.addBook);
router.delete('/:_id',tokenMatch,bookController.deleteBook);
router.patch('/:_id',tokenMatch,bookController.updateBook);
router.get('/:pageNo',tokenMatch,bookController.getAllBook);
router.get('/filter/:pageNo',tokenMatch,bookController.filterBookByNameOrAuthorName);
router.get('/search/:pageNo',tokenMatch,bookController.searchBook);

module.exports = {router};