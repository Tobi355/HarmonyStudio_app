import * as reservationService from '../services/reservation.service.js';

export const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getUserReservations(req.user._id);
    res.json({ success: true, reservations });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.json({ success: true, reservations });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { classId, date } = req.body;
    const reservation = await reservationService.create(req.user._id, classId, date);
    res.status(201).json({ success: true, reservation });
  } catch (error) {
    next(error);
  }
};

export const cancel = async (req, res, next) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const reservation = await reservationService.deleteReservation(req.params.id, req.user._id, isAdmin);
    res.json({ success: true, reservation });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const userId = isAdmin ? null : req.user._id;
    const reservation = await reservationService.update(req.params.id, userId, req.body);
    res.json({ success: true, reservation });
  } catch (error) {
    next(error);
  }
};

