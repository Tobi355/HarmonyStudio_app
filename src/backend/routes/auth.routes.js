import { Router } from 'express';
import * as controller from '../controllers/auth.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { registerValidation, loginValidation, updateProfileValidation } from '../validations/auth.validation.js';

const router = Router();

router.post('/register', registerValidation, validate, controller.register);
router.post('/login', loginValidation, validate, controller.login);
router.get('/profile', authenticate, controller.getProfile);
router.put('/profile', authenticate, updateProfileValidation, validate, controller.updateProfile);

export default router;
