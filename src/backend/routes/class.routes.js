import { Router } from 'express';
import * as controller from '../controllers/class.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import authorizeAdmin from '../middlewares/admin.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { createClassValidation, updateClassValidation } from '../validations/class.validation.js';

const router = Router();

router.get('/admin', authenticate, authorizeAdmin, controller.getAllAdmin);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', authenticate, authorizeAdmin, createClassValidation, validate, controller.create);
router.put('/:id', authenticate, authorizeAdmin, updateClassValidation, validate, controller.update);
router.delete('/:id', authenticate, authorizeAdmin, controller.remove);

export default router;
