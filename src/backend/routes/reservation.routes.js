import { Router } from 'express';
import * as controller from '../controllers/reservation.controller.js';
import authenticate from '../middlewares/auth.middleware.js';
import authorizeAdmin from '../middlewares/admin.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { createReservationValidation, updateReservationValidation } from '../validations/reservation.validation.js';

const router = Router();

router.use(authenticate);

router.get('/admin/all', authorizeAdmin, controller.getAll);
router.get('/', controller.getMyReservations);
router.post('/', createReservationValidation, validate, controller.create);
router.put('/:id', updateReservationValidation, validate, controller.update);
router.delete('/:id', controller.cancel);

export default router;
