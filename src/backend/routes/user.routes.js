import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import authorizeAdmin from '../middlewares/admin.middleware.js';

const router = Router();

router.use(authenticate, authorizeAdmin);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
