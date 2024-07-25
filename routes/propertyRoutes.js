import express from 'express';
import {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
  searchProperties,
} from '../controllers/propertyController.js';
import auth from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', auth, createProperty);
router.get('/', auth, getProperties);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);
router.get('/search', auth, searchProperties);

module.exports = router;
