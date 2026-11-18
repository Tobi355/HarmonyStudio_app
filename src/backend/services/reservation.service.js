import mongoose from 'mongoose';
import Reservation from '../models/Reservation.js';
import Class from '../models/Class.js';
import AppError from '../utils/error.js';

const getUserReservations = async (userId) => {
  return Reservation.find({ user: userId })
    .populate('class')
    .sort({ date: -1 });
};

const getAllReservations = async () => {
  return Reservation.find()
    .populate('user', 'name email')
    .populate('class')
    .sort({ createdAt: -1 });
};

const create = async (userId, classId, date) => {
  const cls = await Class.findById(classId);
  if (!cls) throw new AppError('Class not found.', 404);
  if (!cls.isActive) throw new AppError('Class is no longer active.', 400);

  if (cls.enrolledCount >= cls.capacity) {
    throw new AppError('Class is full.', 400);
  }

  const existing = await Reservation.findOne({
    user: userId,
    class: classId,
    date: new Date(date),
    status: 'confirmed',
  });
  if (existing) {
    throw new AppError('Ya tenes una reserva programada para esa fecha.', 409);
  }

  const reservation = await Reservation.create({
    user: userId,
    class: classId,
    date: new Date(date),
  });

  return reservation.populate('class');
};

const deleteReservation = async (reservationId, userId, isAdmin = false) => {
  const query = { _id: reservationId };
  if (!isAdmin) {
    query.user = userId;
  }

  const reservation = await Reservation.findOne(query);
  if (!reservation) throw new AppError('Reservation not found.', 404);

  if (reservation.status === 'confirmed') {
    const ClassModel = mongoose.model('Class');
    await ClassModel.findOneAndUpdate(
      { _id: reservation.class, enrolledCount: { $gt: 0 } },
      { $inc: { enrolledCount: -1 } },
      { new: true }
    );
  }

  await Reservation.deleteOne({ _id: reservationId });
  return reservation;
};

const update = async (reservationId, userId, updates) => {
  let query = { _id: reservationId };
  if (userId) {
    query.user = userId;
  }

  const reservation = await Reservation.findOne(query);
  if (!reservation) throw new AppError('Reservation not found.', 404);

  if (updates.date) {
    const cls = await Class.findById(reservation.class);
    if (!cls) throw new AppError('Class not found.', 404);

    const existing = await Reservation.findOne({
      _id: { $ne: reservationId },
      user: reservation.user,
      class: reservation.class,
      date: new Date(updates.date),
      status: 'confirmed',
    });
    if (existing) {
      throw new AppError('Ya tenes una reserva programada para esa fecha.', 409);
    }
    reservation.date = new Date(updates.date);
  }

  if (updates.status) {
    if (updates.status === 'cancelled' && reservation.status === 'confirmed') {
      reservation.status = 'cancelled';
    } else if (updates.status === 'confirmed' && reservation.status === 'cancelled') {
      const cls = await Class.findById(reservation.class);
      if (!cls) throw new AppError('Class not found.', 404);
      if (!cls.isActive) throw new AppError('Class is no longer active.', 400);
      if (cls.enrolledCount >= cls.capacity) {
        throw new AppError('Class is full.', 400);
      }
      reservation.status = 'confirmed';
    } else {
      reservation.status = updates.status;
    }
  }

  await reservation.save();
  return (await reservation.populate('class')).populate('user', 'name email');
};

export { getUserReservations, getAllReservations, create, deleteReservation, update };
