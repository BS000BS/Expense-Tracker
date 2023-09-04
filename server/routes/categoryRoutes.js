const express = require('express');
const router = express.Router();
const { getCategories,
        getCategory, 
        createCategory, 
        deleteCategory, 
        updateCategory 
} = require('../controllers/categoryController');

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.patch('/:id', updateCategory);

module.exports = router;